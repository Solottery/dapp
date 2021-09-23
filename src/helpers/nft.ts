/**
 * Big thanks to
 * https://github.com/solana-labs/explorer/
 * https://github.com/metaplex-foundation/metaplex
 * https://github.com/roederw/explorer/blob/roederw/nft-support
 * for the idea how to collect the data.
 */
import {decodeMetadata, METADATA_PREFIX} from "../metaplex/metadata";
import {METADATA_PROGRAM_ID, toPublicKey} from "../metaplex/ids";
import {PublicKey} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import axios from "axios";
import {LotteryTicket} from "../models/lottery-ticket";
import {TraitModel} from "../models/trait.model";


export const getMetaDataFromMint = async (mintAddress: string, connection: anchor.web3.Connection): Promise<LotteryTicket> =>  {

    const holders = await connection.getTokenLargestAccounts(new PublicKey(mintAddress));
    const holderAccount = holders.value.find(h => h.amount === '1');
    const holderAccountInfo =  await connection.getParsedAccountInfo(new PublicKey(holderAccount.address.toString()),
        'confirmed');
    const owner = holderAccountInfo.value.owner.toString();

    // first get the account which holds the metadata for the mint
    const metaDataAccount = await findProgramAddress(
        [
            Buffer.from(METADATA_PREFIX),
            toPublicKey(METADATA_PROGRAM_ID).toBuffer(),
            toPublicKey(mintAddress).toBuffer(),
        ],
        toPublicKey(METADATA_PROGRAM_ID));

    // read account info from chain
    const accountInfo =  await connection.getAccountInfo(new PublicKey(metaDataAccount[0]), 'confirmed');
    // decode brosh ecoded meta data
    const metaData = decodeMetadata(Buffer.from(accountInfo.data));
    // get json from arewave
    const fullMetaData = await axios.get(metaData.data.uri);

    return {
        name: fullMetaData.data.name,
        img: fullMetaData.data.image,
        winMultiplier: {
            value: fullMetaData.data.attributes[0].value,
            rarity: 0,
            name: fullMetaData.data.attributes[0].trait_type,
        } as TraitModel,
        playMultiplier:  {
            value: fullMetaData.data.attributes[1].value,
            rarity: 0,
            name: fullMetaData.data.attributes[1].trait_type,
        } as TraitModel,
        ticketType:  {
            value: fullMetaData.data.attributes[2].value,
            rarity: 0,
            name: fullMetaData.data.attributes[2].trait_type,
        } as TraitModel,
        owner: owner
    } as LotteryTicket;

}

export const findProgramAddress = async (
    seeds: (Buffer | Uint8Array)[],
    programId: PublicKey,
) => {
    const result = await PublicKey.findProgramAddress(seeds, programId);
    return [result[0].toBase58(), result[1]] as [string, number];
};

