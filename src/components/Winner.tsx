import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonImg} from "@ionic/react";
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
        <IonCard className='winning-item-card'>
            <IonCardHeader className={'ion-text-center'}>
                <h1 className={'winning-ticket-text'}>
                    WINNER
                </h1>
                <IonCardSubtitle>
                    <a href={'https://explorer.solana.com/address/' + props?.winner?.winner}>{props?.winner?.winner}</a>
                </IonCardSubtitle>
                <br/>
                <h2 className={'winning-ticket-text'}>Winning Ticket:</h2>
                <IonImg onClick={showTicket} className={'winning-item-image'} src={props?.winner?.ticketUrl}/>

                <h2 className={'winning-ticket-text'}>Transactions:</h2>
                {props?.winner?.assets?.map(item => {
                    return <a href={'https://explorer.solana.com/tx/' + item?.tx}>{item?.name}</a>
                })}
            </IonCardHeader>
        </IonCard>
    );
};
export default Winner;
