import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useCallback, useEffect, useState} from "react";
import {IonButton} from "@ionic/react";
import {getCandyMachineState} from "../helpers/candy-machine";
import {MY_CANDY_MACHINE_ID} from "../helpers/constants";
import * as anchor from "@project-serum/anchor";

const MintedAmount: React.FC = () => {

    const connection = useConnection();
    const wallet = useWallet();
    const [total, setTotal] = useState(0)
    const [remaining, setRemaining] = useState(0)

    const getMintedAmount = useCallback(async () => {
        const anchorWallet = {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
        const info = await getCandyMachineState(anchorWallet, connection.connection)
        setRemaining(info.itemsRemaining);
        setTotal(info.itemsAvailable);

        // await getCandyMachineMints(connection.connection, MY_CANDY_MACHINE_ID);

    }, [connection, wallet]);

    useEffect(( ) => {
        const fetchData = async () => {
            await getMintedAmount();
        }
        const interval = setInterval(() => {
            fetchData()
        }, 30000);
        fetchData()
        return () => clearInterval(interval);
    }, [getMintedAmount]);

    return (
        <IonButton onClick={getMintedAmount}>{remaining}/{total} </IonButton>
    );
};

export default MintedAmount;
