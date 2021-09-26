import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonImg, IonItem, IonLabel,
    IonList,
    IonRow
} from "@ionic/react";
import {useContext} from "react";
import {TicketListContext} from "../hooks/useTicketList";
import {LotteryTicket} from "../models/lottery-ticket";

const ViewerList: React.FC = () => {

    const tickets = useContext<LotteryTicket[]>(TicketListContext);

    return (
        <IonList>
                {tickets.map((ticket, index) =>
                    <IonItem key={ticket.name}>
                        <IonAvatar>
                            <IonImg src={ticket.img}/>
                        </IonAvatar>

                        <IonLabel>
                            {ticket.name}
                        </IonLabel>

                    </IonItem>
                )}
        </IonList>
    );
};

export default ViewerList;
