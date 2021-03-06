/**
 * Code from metaplex and roederw.
 * https://github.com/metaplex-foundation/metaplex
 * https://github.com/roederw/explorer/blob/roederw/nft-support
 */
import BN from "bn.js";
import {PublicKey, SOLANA_SCHEMA} from "@solana/web3.js";
import {
    AUCTION_ID,
    BPF_UPGRADE_LOADER_ID,
    MEMO_ID,
    METADATA_PROGRAM_ID,
    METAPLEX_ID, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    SYSTEM, TOKEN_PROGRAM_ID,
    toPublicKey,
    VAULT_ID
} from "./ids";
import {BinaryReader, BinaryWriter, deserialize, deserializeUnchecked, serialize} from "borsh";
import base58 from "bs58";

export const METADATA_PREFIX = 'metadata';
export const EDITION = 'edition';
export const RESERVATION = 'reservation';
export const EDITION_MARKER_BIT_SIZE = 248;

class CreateMetadataArgs {
    instruction: number = 0;
    data: Data;
    isMutable: boolean;

    constructor(args: { data: Data; isMutable: boolean }) {
        this.data = args.data;
        this.isMutable = args.isMutable;
    }
}


export class Data {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
    constructor(args: {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Creator[] | null;
    }) {
        this.name = args.name;
        this.symbol = args.symbol;
        this.uri = args.uri;
        this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
        this.creators = args.creators;
    }
}

export class Creator {
    address: StringPublicKey;
    verified: boolean;
    share: number;

    constructor(args: {
        address: StringPublicKey;
        verified: boolean;
        share: number;
    }) {
        this.address = args.address;
        this.verified = args.verified;
        this.share = args.share;
    }
}

export type StringPublicKey = string;

class UpdateMetadataArgs {
    instruction: number = 1;
    data: Data | null;
    // Not used by this app, just required for instruction
    updateAuthority: StringPublicKey | null;
    primarySaleHappened: boolean | null;
    constructor(args: {
        data?: Data;
        updateAuthority?: string;
        primarySaleHappened: boolean | null;
    }) {
        this.data = args.data ? args.data : null;
        this.updateAuthority = args.updateAuthority ? args.updateAuthority : null;
        this.primarySaleHappened = args.primarySaleHappened;
    }
}

class CreateMasterEditionArgs {
    instruction: number = 10;
    maxSupply: BN | null;
    constructor(args: { maxSupply: BN | null }) {
        this.maxSupply = args.maxSupply;
    }
}

class MintPrintingTokensArgs {
    instruction: number = 9;
    supply: BN;

    constructor(args: { supply: BN }) {
        this.supply = args.supply;
    }
}

export enum MetadataKey {
    Uninitialized = 0,
    MetadataV1 = 4,
    EditionV1 = 1,
    MasterEditionV1 = 2,
    MasterEditionV2 = 6,
    EditionMarker = 7,
}

export class MasterEditionV1 {
    key: MetadataKey;
    supply: BN;
    maxSupply?: BN;
    /// Can be used to mint tokens that give one-time permission to mint a single limited edition.
    printingMint: StringPublicKey;
    /// If you don't know how many printing tokens you are going to need, but you do know
    /// you are going to need some amount in the future, you can use a token from this mint.
    /// Coming back to token metadata with one of these tokens allows you to mint (one time)
    /// any number of printing tokens you want. This is used for instance by Auction Manager
    /// with participation NFTs, where we dont know how many people will bid and need participation
    /// printing tokens to redeem, so we give it ONE of these tokens to use after the auction is over,
    /// because when the auction begins we just dont know how many printing tokens we will need,
    /// but at the end we will. At the end it then burns this token with token-metadata to
    /// get the printing tokens it needs to give to bidders. Each bidder then redeems a printing token
    /// to get their limited editions.
    oneTimePrintingAuthorizationMint: StringPublicKey;

    constructor(args: {
        key: MetadataKey;
        supply: BN;
        maxSupply?: BN;
        printingMint: StringPublicKey;
        oneTimePrintingAuthorizationMint: StringPublicKey;
    }) {
        this.key = MetadataKey.MasterEditionV1;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
        this.printingMint = args.printingMint;
        this.oneTimePrintingAuthorizationMint =
            args.oneTimePrintingAuthorizationMint;
    }
}

export class MasterEditionV2 {
    key: MetadataKey;
    supply: BN;
    maxSupply?: BN;

    constructor(args: { key: MetadataKey; supply: BN; maxSupply?: BN }) {
        this.key = MetadataKey.MasterEditionV2;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
    }
}


export class Edition {
    key: MetadataKey;
    /// Points at MasterEdition struct
    parent: StringPublicKey;
    /// Starting at 0 for master record, this is incremented for each edition minted.
    edition: BN;

    constructor(args: {
        key: MetadataKey;
        parent: StringPublicKey;
        edition: BN;
    }) {
        this.key = MetadataKey.EditionV1;
        this.parent = args.parent;
        this.edition = args.edition;
    }
}

export class Metadata {
    key: MetadataKey;
    updateAuthority: StringPublicKey;
    mint: StringPublicKey;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    editionNonce: number | null;

    // set lazy
    masterEdition?: StringPublicKey;
    edition?: StringPublicKey;

    constructor(args: {
        updateAuthority: StringPublicKey;
        mint: StringPublicKey;
        data: Data;
        primarySaleHappened: boolean;
        isMutable: boolean;
        editionNonce: number | null;
    }) {
        this.key = MetadataKey.MetadataV1;
        this.updateAuthority = args.updateAuthority;
        this.mint = args.mint;
        this.data = args.data;
        this.primarySaleHappened = args.primarySaleHappened;
        this.isMutable = args.isMutable;
        this.editionNonce = args.editionNonce;
    }

    public async init() {
        const edition = await getEdition(this.mint);
        this.edition = edition;
        this.masterEdition = edition;
    }
}

let STORE: PublicKey | undefined;

export async function getEdition(
    tokenMint: StringPublicKey,
): Promise<StringPublicKey> {
    const PROGRAM_IDS = programIds();

    return (
        await findProgramAddress(
            [
                Buffer.from(METADATA_PREFIX),
                toPublicKey(PROGRAM_IDS.metadata).toBuffer(),
                toPublicKey(tokenMint).toBuffer(),
                Buffer.from(EDITION),
            ],
            toPublicKey(PROGRAM_IDS.metadata),
        )
    )[0];
}

export const programIds = () => {
    return {
        token: TOKEN_PROGRAM_ID,
        associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        bpf_upgrade_loader: BPF_UPGRADE_LOADER_ID,
        system: SYSTEM,
        metadata: METADATA_PROGRAM_ID,
        memo: MEMO_ID,
        vault: VAULT_ID,
        auction: AUCTION_ID,
        metaplex: METAPLEX_ID,
        store: STORE,
    };
};


export const findProgramAddress = async (
    seeds: (Buffer | Uint8Array)[],
    programId: PublicKey,
) => {
    const key =
        'pda-' +
        seeds.reduce((agg, item) => agg + item.toString('hex'), '') +
        programId.toString();
    const result = await PublicKey.findProgramAddress(seeds, programId);
    return [result[0].toBase58(), result[1]] as [string, number];
};


export class EditionMarker {
    key: MetadataKey;
    ledger: number[];

    constructor(args: { key: MetadataKey; ledger: number[] }) {
        this.key = MetadataKey.EditionMarker;
        this.ledger = args.ledger;
    }

    editionTaken(edition: number) {
        const editionOffset = edition % EDITION_MARKER_BIT_SIZE;
        const indexOffset = Math.floor(editionOffset / 8);

        if (indexOffset > 30) {
            throw Error('bad index for edition');
        }

        const positionInBitsetFromRight = 7 - (editionOffset % 8);

        const mask = Math.pow(2, positionInBitsetFromRight);

        const appliedMask = this.ledger[indexOffset] & mask;

        return appliedMask != 0;
    }
}


export const METADATA_SCHEMA = new Map<any, any>([
    [
        CreateMetadataArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['data', Data],
                ['isMutable', 'u8'], // bool
            ],
        },
    ],
    [
        UpdateMetadataArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['data', { kind: 'option', type: Data }],
                ['updateAuthority', { kind: 'option', type: 'pubkeyAsString' }],
                ['primarySaleHappened', { kind: 'option', type: 'u8' }],
            ],
        },
    ],

    [
        CreateMasterEditionArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['maxSupply', { kind: 'option', type: 'u64' }],
            ],
        },
    ],
    [
        MintPrintingTokensArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['supply', 'u64'],
            ],
        },
    ],
    [
        MasterEditionV1,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['supply', 'u64'],
                ['maxSupply', { kind: 'option', type: 'u64' }],
                ['printingMint', 'pubkeyAsString'],
                ['oneTimePrintingAuthorizationMint', 'pubkeyAsString'],
            ],
        },
    ],
    [
        MasterEditionV2,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['supply', 'u64'],
                ['maxSupply', { kind: 'option', type: 'u64' }],
            ],
        },
    ],
    [
        Edition,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['parent', 'pubkeyAsString'],
                ['edition', 'u64'],
            ],
        },
    ],
    [
        Data,
        {
            kind: 'struct',
            fields: [
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
                ['sellerFeeBasisPoints', 'u16'],
                ['creators', { kind: 'option', type: [Creator] }],
            ],
        },
    ],
    [
        Creator,
        {
            kind: 'struct',
            fields: [
                ['address', 'pubkeyAsString'],
                ['verified', 'u8'],
                ['share', 'u8'],
            ],
        },
    ],
    [
        Metadata,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['updateAuthority', 'pubkeyAsString'],
                ['mint', 'pubkeyAsString'],
                ['data', Data],
                ['primarySaleHappened', 'u8'], // bool
                ['isMutable', 'u8'], // bool
            ],
        },
    ],
    [
        EditionMarker,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['ledger', [31]],
            ],
        },
    ],
]);

const METADATA_REPLACE = new RegExp('\u0000', 'g');

export const decodeMetadata = (buffer: Buffer): Metadata => {
    const metadata = deserializeUnchecked(
        METADATA_SCHEMA,
        Metadata,
        buffer,
    ) as Metadata;

    metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
    metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
    metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
    return metadata;
};




// Class wrapping a plain object
export class Struct {
    constructor(properties: any) {
        Object.assign(this, properties);
    }

    encode(): Buffer {
        return Buffer.from(serialize(SOLANA_SCHEMA, this));
    }

    static decode(data: Buffer): any {
        return deserialize(SOLANA_SCHEMA, this, data);
    }

    static decodeUnchecked(data: Buffer): any {
        return deserializeUnchecked(SOLANA_SCHEMA, this, data);
    }
}


export const extendBorsh = () => {
    (BinaryReader.prototype as any).readPubkey = function () {
        const reader = this as unknown as BinaryReader;
        const array = reader.readFixedArray(32);
        return new PublicKey(array);
    };

    (BinaryWriter.prototype as any).writePubkey = function (value: any) {
        const writer = this as unknown as BinaryWriter;
        writer.writeFixedArray(value.toBuffer());
    };

    (BinaryReader.prototype as any).readPubkeyAsString = function () {
        const reader = this as unknown as BinaryReader;
        const array = reader.readFixedArray(32);
        return base58.encode(array) as StringPublicKey;
    };

    (BinaryWriter.prototype as any).writePubkeyAsString = function (
        value: StringPublicKey
    ) {
        const writer = this as unknown as BinaryWriter;
        writer.writeFixedArray(base58.decode(value));
    };
};

extendBorsh();
