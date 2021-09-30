import React, {createContext, useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../helpers/constants";
import {OwnerModel} from "../models/owner-model";

export const OwnerListContext = createContext<OwnerModel[]>([]);

export const OwnerListProvider: React.FC = (props) => {

    const [owners, setOwners] = useState<OwnerModel[]>([]);

    const getOwners = useCallback(async () => {
        let request = await axios.get(BACKEND_URL + '/owners/');
        if (request.data) {
            setOwners(request.data);
        }
    }, [setOwners]);

    useEffect(() => {
        const fetchData = async () => {
            await getOwners();
        }

        const interval = setInterval(() => {
            fetchData()
        }, 50000);

        fetchData()

        return () => clearInterval(interval);
    }, [setOwners])

    return (
        <OwnerListContext.Provider value={owners}>
            {props.children}
        </OwnerListContext.Provider>

    )
};
