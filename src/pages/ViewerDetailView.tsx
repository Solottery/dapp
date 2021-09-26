import {
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonMenuButton,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {LotteryTicket} from "../models/lottery-ticket";
import {useContext} from "react";
import {TicketListContext} from "../hooks/useTicketList";
import {RouteComponentProps} from "react-router";
import ViewerDetailViewItem from "../components/ViewerDetailViewItem";

interface ViewerDetailViewProps
    extends RouteComponentProps<{
        id: string;
    }> {}

const ViewerDetailView: (props: ViewerDetailViewProps) => JSX.Element = (props: ViewerDetailViewProps) => {

    const tickets = useContext<LotteryTicket[]>(TicketListContext);

    const getTicketByNumber = (ticket: LotteryTicket) => {


        return ticket.name === 'Ticket: ' + props.match?.params?.id;
    }

    const ticketExists = (name: string): boolean => {
        console.log(props.match?.params?.id);

        if(!props.match?.params?.id){
            return false;
        }

        let index = tickets.findIndex(getTicketByNumber);
        if(!index){
            return false;
        }
        console.log(index);

        let ticket = tickets[index]
        console.log(ticket);
        if(!ticket){
            return false;
        }
        return true;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className={'title-text'}>Detail</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {ticketExists ?
                    <ViewerDetailViewItem ticket={tickets[tickets.findIndex(getTicketByNumber)]}/> :
                    <IonText>Loading</IonText>
                }
            </IonContent>
        </IonPage>
    );
};

export default ViewerDetailView;
