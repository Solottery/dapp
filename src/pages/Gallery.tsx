import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonMenuButton, IonPage, IonSearchbar, IonTitle,
    IonToolbar
} from "@ionic/react";
import {useCallback, useContext, useEffect, useState} from "react";
import {TicketListContext} from "../hooks/useTicketList";
import ViewerList from "../components/ViewerList";


const Lottery: React.FC = () => {
    const tickets = useContext(TicketListContext);

    const [searchText, setSearchText] = useState('');


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
                <ViewerList/>
            </IonContent>

        </IonPage>
    );
};

export default Lottery;
