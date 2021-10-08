import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonRow} from "@ionic/react";
import {AssetModel} from "../models/lotter.model";
import "./NFT.css";

export interface NftProps {
    asset: AssetModel
}

const NFT: (probs: NftProps) => JSX.Element = (probs: NftProps) => {
    return (
        <IonCard className='jackpot-item-card'>
            <IonCardHeader>
                <IonCardTitle>
                    {probs?.asset?.name}
                </IonCardTitle>
                <IonImg className={'jackpot-item-image'} src={probs?.asset?.preview}/>
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
export default NFT;
