import {
    IonCard, IonCardTitle, IonCol, IonGrid,
    IonImg, IonRow, useIonRouter,
} from "@ionic/react";
import {LotteryTicket} from "../models/lottery-ticket";
import "./ViewerDetailViewItem.css";
import {useEffect} from "react";


export interface TicketItemProps {
    ticket: LotteryTicket,
}

const ViewerDetailViewItem: (props: TicketItemProps) => JSX.Element = (props: TicketItemProps) => {
    const router = useIonRouter();

    useEffect(() => {
        if(!props?.ticket){
            router.goBack();
        }
    }, [router])

    return (
        <div>
            <h1 className={'center-detail-title'}>
                {props?.ticket?.name}
            </h1>
            <IonImg  src={props?.ticket.img} id={'detail-view-image'} />

            <div id={'detail-view-block'}>
                <IonGrid>
                    <IonRow>
                        <IonCol size={'6'}>
                            Ticket Type:
                        </IonCol>
                        <IonCol size={'3'}>
                            {props?.ticket.ticketType.value}
                        </IonCol>
                        <IonCol size={'3'}>
                            {props?.ticket.ticketType.rarity.toFixed(2)}%
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={'6'}>
                            Win Multiplier:
                        </IonCol>
                        <IonCol size={'3'}>
                            {props?.ticket.winMultiplier.value}
                        </IonCol>
                        <IonCol size={'3'}>
                            {props?.ticket.winMultiplier.rarity.toFixed(2)}%
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={'6'}>
                            Play Multiplier:
                        </IonCol>
                        <IonCol size={'3'}>
                            {props?.ticket.playMultiplier.value}
                        </IonCol>
                        <IonCol size={'3'}>
                            {props?.ticket.playMultiplier.rarity.toFixed(2)}%
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={'6'}>
                            Address:
                        </IonCol>
                        <IonCol size={'6'}>
                            <a href={"https://explorer.solana.com/address/" + props?.ticket.mint}>{props?.ticket.mint}</a>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={'6'}>
                            Owner:
                        </IonCol>
                        <IonCol size={'6'}>
                            <a href={"https://explorer.solana.com/address/" + props?.ticket.owner}>{props?.ticket.owner}</a>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={'6'}>
                            Rarity Ranking:
                        </IonCol>
                        <IonCol size={'6'}>
                            {props?.ticket.rarityRank}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>

        </div>
    );
};

export default ViewerDetailViewItem;
