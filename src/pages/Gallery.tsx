import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {useContext} from "react";
import {TicketListContext} from "../hooks/useTicketList";
import ViewerList from "../components/ViewerList";
import {LotteryTicket} from "../models/lottery-ticket";


const Gallery: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className={'title-text'}>Minted Tickets</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <ViewerList/>
            </IonContent>
        </IonPage>
    );
};

export default Gallery;
