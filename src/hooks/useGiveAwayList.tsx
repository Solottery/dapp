import React, {createContext, useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../helpers/constants";
import {LotteryModel} from "../models/lotter.model";

export const GiveAwayListContext = createContext<LotteryModel[]>([]);

export const GiveAwayListProvider: React.FC = (props) => {

    const [giveAways, setGiveAways] = useState<LotteryModel[]>([]);

    const getGiveAways = useCallback(async () => {
        let request = await axios.get(BACKEND_URL + '/lotteries/');
        if (request.data) {
            setGiveAways(request.data);
        }
    }, [setGiveAways]);

    useEffect(() => {
        const fetchData = async () => {
            await getGiveAways();
        }

        const interval = setInterval(() => {
            fetchData()
        }, 50000);

        fetchData()

        return () => clearInterval(interval);
    }, [setGiveAways])

    return (
        <GiveAwayListContext.Provider value={giveAways}>
            {props.children}
        </GiveAwayListContext.Provider>

    )
};
