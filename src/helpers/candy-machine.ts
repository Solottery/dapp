/**
 * Code used form exiled apes
 * https://github.com/exiled-apes/candy-machine-mint
 * Big thanks
 */

import * as anchor from "@project-serum/anchor";
import {CANDY_MACHINE_PROGRAM_ID, MY_CANDY_MACHINE_ID, TICKETS_STORAGE_KEY} from "./constants";
import { ParsedInstruction, PublicKey} from "@solana/web3.js";
import {getMetaDataFromMint} from "./nft";
import { Storage } from '@capacitor/storage';
import {SerializableTicketList, TicketListModel} from "../models/ticket.list.model";
import {LotteryTicket} from "../models/lottery-ticket";

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
    connection: anchor.web3.Connection
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
        id: MY_CANDY_MACHINE_ID,
        connection,
        program,
    }

    const state: any = await program.account.candyMachine.fetch(MY_CANDY_MACHINE_ID);

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

export const getAllMintedTickets = async (connection: anchor.web3.Connection,
                                          anchorWallet: anchor.Wallet): Promise<TicketListModel> => {

    const candyMachineInfo = await getCandyMachineState(anchorWallet, connection);
    const cachedTickets = await Storage.get({key: TICKETS_STORAGE_KEY});

    if(cachedTickets.value){
        const cachedList = JSON.parse(cachedTickets.value) as SerializableTicketList;
        if(cachedList.amount == candyMachineInfo.itemsRedeemed){
            return {
                tickets: new Map(cachedList.tickets),
                amount: cachedList.amount
            } as TicketListModel;
        }
    }

    const list = await updateTicketList(connection);
    await Storage.set({
        key: TICKETS_STORAGE_KEY,
        value: JSON.stringify({
            tickets: Array.from(list.tickets.entries()),
            amount: list.amount
        } as SerializableTicketList)
    });
    return list;
}

const updateTicketList = async (connection: anchor.web3.Connection): Promise<TicketListModel> => {
    const options =  {
        limit: 25
    };

    const fetched = await connection.getConfirmedSignaturesForAddress2(
        MY_CANDY_MACHINE_ID,
        options
    );

    const signatures = fetched.map(f => f.signature);
    const txs = await connection.getParsedConfirmedTransactions(signatures, 'confirmed');
    let mints = new Map<string, LotteryTicket>();

    for(let tx in txs){

        const accountInstruction = txs[tx].transaction.message.instructions[1] as ParsedInstruction;
        if(accountInstruction){

            if(accountInstruction && accountInstruction.parsed.type === 'initializeMint'){
                const mint = accountInstruction.parsed.info.mint;
                const mintData = await getMetaDataFromMint(mint, connection);
                mints.set(mintData.name, mintData);
            }
        }
    }

    return {
        amount: mints.size,
        tickets: mints
    }
}


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
            reject({timeout: true});
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
