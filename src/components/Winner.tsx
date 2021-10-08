import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonImg,
    IonRow
} from "@ionic/react";
import {LotteryResult} from "../models/lotter.model";
import "./Winner.css";

export interface WinnerProps {
    winner: LotteryResult
}

const Winner: (props: WinnerProps) => JSX.Element = (props: WinnerProps) => {
    const showTicket = () => {
        window.open('https://explorer.solana.com/address/' + props?.winner?.ticket)
    }

    return (
        <IonCard className='jackpot-item-card'>
            <IonCardHeader className={'ion-text-center'}>
                <h1 className={'winning-ticket-text'}>
                    WINNER
                </h1>
                <IonCardSubtitle>
                   <a   href={'https://explorer.solana.com/address/' + props?.winner?.winner}>{props?.winner?.winner}</a>
                </IonCardSubtitle>
                <br/>
                <h2 className={'winning-ticket-text'}>Winning Ticket:</h2>
                <IonImg onClick={showTicket} className={'jackpot-item-image'} src={props?.winner?.ticketUrl}/>
                <IonCardContent className='card-title-center'>
                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};
export default Winner;
