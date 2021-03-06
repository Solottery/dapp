import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg} from "@ionic/react";
import './Ticket.css';

export interface TicketProbs {
    img: string,
    description: string
    name: string
    amount: number
}

const Ticket: (probs: TicketProbs) => JSX.Element = (probs: TicketProbs) => {

    return (
        <IonCard className='ticket-card'>
            <IonCardHeader className='center-grid-color'>
                <IonCardTitle className='card-title-center'>
                    {probs.name}
                </IonCardTitle>
                <IonImg className={'ticket-image'} src={"assets/tickets/" + probs.name + ".png"}/>
                <IonCardContent className='card-title-center'>
                    {probs.description}
                    <br/>
                    <br/>
                    Mintable amount: {probs.amount}
                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default Ticket;
