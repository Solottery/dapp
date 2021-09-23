import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonMenuButton, IonPage, IonSearchbar, IonTitle,
    IonToolbar
} from "@ionic/react";
import {useCallback, useEffect, useState} from "react";
import {getCandyMachineMints, getCandyMachineState} from "../helpers/candy-machine";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import {MY_CANDY_MACHINE_ID} from "../helpers/constants";


const Lottery: React.FC = () => {

    const connection = useConnection();
    const [searchText, setSearchText] = useState('');

    const getMintedTickets = useCallback(async () => {
        await getCandyMachineMints(connection.connection, MY_CANDY_MACHINE_ID);
    }, [connection]);

    useEffect(( ) => {
        const fetchData = async () => {
            await getMintedTickets();
        }
        const interval = setInterval(() => {
            fetchData()
        }, 30000);

        fetchData()

        return () => clearInterval(interval);
    }, [getMintedTickets]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className={'title-text'}>Minted Tickets</IonTitle>
                </IonToolbar>
                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}/>
            </IonHeader>

            <IonContent>
                <IonCard>
                    <IonCardContent>
                        Coming soon...
                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>
    );
};

export default Lottery;
