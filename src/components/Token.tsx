import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonRow} from "@ionic/react";
import './Ticket.css';
import {TicketProbs} from "./Ticket";
import {AssetModel} from "../models/lotter.model";

export interface TokenProps {
    asset: AssetModel
}

const Token: (probs: TokenProps) => JSX.Element = (probs: TokenProps) => {

    return (
        <IonCard className='jackpot-item-card'>
            <IonCardHeader>
                <IonCardTitle className='card-title-center'>
                    {probs?.asset?.name}
                </IonCardTitle>
                <IonImg className={'jackpot-item-image'} src={"assets/img/" + probs?.asset?.preview}/>
                <IonCardContent className='card-title-center'>

                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                Project:
                            </IonCol>
                            <IonCol>
                                <a href={probs?.asset?.website}>Website</a>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                Jackpot size:
                            </IonCol>
                            <IonCol>
                                {probs?.asset?.amount}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default Token;
