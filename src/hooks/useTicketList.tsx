import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {TicketListModel} from "../models/ticket.list.model";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {getAllMintedTickets, getCandyMachineState} from "../helpers/candy-machine";
import * as anchor from "@project-serum/anchor";

export const TicketListContext = createContext({} as TicketListModel);

export const TicketListProvider: React.FC = (props) =>  {

    const [tickets, setTickets] = useState({
        amount: 0
    } as TicketListModel);
    const wallet = useWallet();
    const connection = useConnection();


    const getMintedAmount = useCallback(async () => {
        const anchorWallet = {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
        const info = await getCandyMachineState(anchorWallet, connection.connection)
        console.log(tickets.amount);
        if(info.itemsRedeemed > tickets.amount){
          const newList = await getAllMintedTickets(connection.connection, anchorWallet);
          setTickets(newList);
        }
    }, [connection, wallet]);

    useEffect(() => {
        const fetchData = async () => {
            await getMintedAmount();
        }

        const interval = setInterval(() => {
            fetchData()
        }, 1000);

        return () => clearInterval(interval);

    }, [wallet, connection, tickets]);

    return (
        <TicketListContext.Provider value={tickets}>
            {props.children}
        </TicketListContext.Provider>

    )
};
