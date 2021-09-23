/**
 * Code used form exiled apes
 * https://github.com/exiled-apes/candy-machine-mint
 * Big thanks
 */

import * as anchor from "@project-serum/anchor";
import {CANDY_MACHINE_PROGRAM_ID} from "./constants";
import {AccountInfo, ParsedInstruction, PublicKey, TokenAccountsFilter} from "@solana/web3.js";
import {
    decodeMetadata,
    getEdition,
    MasterEditionV1,
    MasterEditionV2,
    METADATA_PREFIX,
    MetadataKey
} from "../metaplex/metadata";
import {METADATA_PROGRAM_ID, StringPublicKey, toPublicKey} from "../metaplex/ids";
import {BinaryReader, BinaryWriter} from "borsh";
import base58 from "bs58";
import {getMetaDataFromMint} from "./nft";

export interface CandyMachine {
    id: anchor.web3.PublicKey,
    connection: anchor.web3.Connection;
    program: anchor.Program;
}

interface CandyMachineState {
    candyMachine: CandyMachine;
    itemsAvailable: number;
    itemsRedeemed: number;
    itemsRemaining: number;
    goLiveDate: Date,
}


export const getCandyMachineState = async (
    anchorWallet: anchor.Wallet,
    candyMachineId: anchor.web3.PublicKey,
    connection: anchor.web3.Connection,
): Promise<CandyMachineState> => {
    const provider = new anchor.Provider(connection, anchorWallet, {
        preflightCommitment: "recent",
    });

    const idl = await anchor.Program.fetchIdl(
        CANDY_MACHINE_PROGRAM_ID,
        provider
    );

    const program = new anchor.Program(idl, CANDY_MACHINE_PROGRAM_ID, provider);
    const candyMachine = {
        id: candyMachineId,
        connection,
        program,
    }

    const state: any = await program.account.candyMachine.fetch(candyMachineId);

    const itemsAvailable = state.data.itemsAvailable.toNumber();
    const itemsRedeemed = state.itemsRedeemed.toNumber();
    const itemsRemaining = itemsAvailable - itemsRedeemed;

    let goLiveDate = state.data.goLiveDate.toNumber();
    goLiveDate = new Date(goLiveDate * 1000);

    return {
        candyMachine,
        itemsAvailable,
        itemsRedeemed,
        itemsRemaining,
        goLiveDate,
    };
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


export const getCandyMachineMints = async (connection: anchor.web3.Connection, candiMachine: PublicKey) =>  {
    // const options =  {
    //     limit: 25
    // };
    //
    // const fetched = await connection.getConfirmedSignaturesForAddress2(
    //     candiMachine,
    //     options
    // );
    //
    // const signatures = fetched.map(f => f.signature);
    // const txs = await connection.getParsedConfirmedTransactions(signatures, 'confirmed');
    // let mints = [];

    // for(let tx in txs){
    //     // console.log(txs[tx].transaction.message.instructions[1])
    //     // const instruction = txs[tx].transaction.message.instructions[1] as ParsedInstruction;
    //     // if(instruction && instruction.parsed.type === 'initializeMint'){
    //     //     mints.push(instruction.parsed.info.mint);
    //     // }
    //     const accountInstruction = txs[tx].transaction.message.instructions[2] as ParsedInstruction;
    //     if(accountInstruction){
    //
    //         if(accountInstruction && accountInstruction.parsed.type === 'create'){
    //             mints.push({mint: accountInstruction.parsed.info.mint, account: accountInstruction.parsed.info.account});
    //             console.log(accountInstruction.parsed.info);
    //
    //             let test = await connection.getAccountInfo(new PublicKey(accountInstruction.parsed.info.account), 'confirmed');
    //             const buffer = Buffer.from(test.data)
    //             const meta = decodeMetadata(buffer);
    //             console.log(meta);
    //         }
    //     }
    // }
    let test = await getMetaDataFromMint('7GzvaWMt8pwiePD5GquBkG65NUt23djHaA8xycnCNWta', connection);

        // let test = await connection.getAccountInfo(new PublicKey('HFzH3iYBXDmDD3DqvCje4n5PVRnJt3x4tcupXa7QkKGV'), 'confirmed');
        // let metaData = await findProgramAddress(
        // [
        //     Buffer.from(METADATA_PREFIX),
        //     toPublicKey(METADATA_PROGRAM_ID).toBuffer(),
        //     toPublicKey('7GzvaWMt8pwiePD5GquBkG65NUt23djHaA8xycnCNWta').toBuffer(),
        // ],
        // toPublicKey(METADATA_PROGRAM_ID));
        //
        // console.log(metaData);
        //
        //
        // if(isMetadataV1Account(test)){
        //     const metadata = decodeMetadata(Buffer.from(test.data));
        // }
        //
        // const metadata = decodeMetadata(Buffer.from(test.data));
        // console.log(metadata);
        // if (isEditionV1Account(test)) {
        //     console.log("isEditionV1Account");
        // }
        //
        // if (isMasterEditionAccount(test)) {
        //     console.log("isMasterEditionAccount");
        // }

        // const meta = decodeMetadata(test.data);
        // console.log(meta);
}



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


const isMetadataAccount = (account: AccountInfo<Buffer>) => {
    return (account.owner as unknown as any) === METADATA_PROGRAM_ID;
};

const isMetadataV1Account = (account: AccountInfo<Buffer>) =>
    account.data[0] === MetadataKey.MetadataV1;

const isEditionV1Account = (account: AccountInfo<Buffer>) =>
    account.data[0] === MetadataKey.EditionV1;

const isMasterEditionAccount = (account: AccountInfo<Buffer>) =>
    account.data[0] === MetadataKey.MasterEditionV1 ||
    account.data[0] === MetadataKey.MasterEditionV2;

const isMasterEditionV1 = (
    me: MasterEditionV1 | MasterEditionV2,
): me is MasterEditionV1 => {
    return me.key === MetadataKey.MasterEditionV1;
};


export const awaitTransactionSignatureConfirmation = async (
    txid: anchor.web3.TransactionSignature,
    timeout: number,
    connection: anchor.web3.Connection,
    commitment: anchor.web3.Commitment = "recent",
    queryStatus = false
): Promise<anchor.web3.SignatureStatus | null | void> => {
    let done = false;
    let status: anchor.web3.SignatureStatus | null | void = {
        slot: 0,
        confirmations: 0,
        err: null,
    };
    let subId = 0;
    status = await new Promise(async (resolve, reject) => {
        setTimeout(() => {
            if (done) {
                return;
            }
            done = true;
            console.log("Rejecting for timeout...");
            reject({ timeout: true });
        }, timeout);
        try {
            subId = connection.onSignature(
                txid,
                (result: any, context: any) => {
                    done = true;
                    status = {
                        err: result.err,
                        slot: context.slot,
                        confirmations: 0,
                    };
                    if (result.err) {
                        console.log("Rejected via websocket", result.err);
                        reject(status);
                    } else {
                        console.log("Resolved via websocket", result);
                        resolve(status);
                    }
                },
                commitment
            );
        } catch (e) {
            done = true;
            console.error("WS error in setup", txid, e);
        }
        while (!done && queryStatus) {
            // eslint-disable-next-line no-loop-func
            await (async () => {
                try {
                    const signatureStatuses = await connection.getSignatureStatuses([
                        txid,
                    ]);
                    status = signatureStatuses && signatureStatuses.value[0];
                    if (!done) {
                        if (!status) {
                            console.log("REST null result for", txid, status);
                        } else if (status.err) {
                            console.log("REST error for", txid, status);
                            done = true;
                            reject(status.err);
                        } else if (!status.confirmations) {
                            console.log("REST no confirmations for", txid, status);
                        } else {
                            console.log("REST confirmation for", txid, status);
                            done = true;
                            resolve(status);
                        }
                    }
                } catch (e) {
                    if (!done) {
                        console.log("REST connection error: txid", txid, e);
                    }
                }
            })();
            await sleep(2000);
        }
    });

    //@ts-ignore
    if (connection._signatureSubscriptions[subId]) {
        connection.removeSignatureListener(subId);
    }
    done = true;
    console.log("Returning status", status);
    return status;
}

const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
