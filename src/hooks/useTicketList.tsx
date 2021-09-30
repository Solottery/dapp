import React, {createContext, useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../helpers/constants";
import {LotteryTicket} from "../models/lottery-ticket";

export const TicketListContext = createContext<LotteryTicket[]>([]);

export const TicketListProvider: React.FC = (props) => {

    const [tickets, setTickets] = useState([] as LotteryTicket[]);

    const getMintedAmount = useCallback(async () => {
        let request = await axios.get(BACKEND_URL + '/tickets/');
        if (request.data) {
            setTickets(request.data);
        }
    }, [setTickets]);

    useEffect(() => {
        const fetchData = async () => {
            await getMintedAmount();
        }

        const interval = setInterval(() => {
            fetchData()
        }, 50000);

        fetchData()
        return () => clearInterval(interval);

    }, [setTickets]);

    return (
        <TicketListContext.Provider value={tickets}>
            {props.children}
        </TicketListContext.Provider>

    )
};
