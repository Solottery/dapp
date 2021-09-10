import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonText} from "@ionic/react";
const Welcome: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Welcome to Solottery
                </IonCardTitle>
                <IonCardSubtitle>
                    Introdoucing Solottery – the first Solana NFT lottery.
                </IonCardSubtitle>
                <IonCardContent>


                    Do you already feel the urge to mint your own ticket to a better life?
                    <br/>
                    Do it now before we are sold out.
                    <br/>
                    Join our community!

                    Link twitter / link discord
                    <br/>
                    Good luck!

                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default Welcome;
