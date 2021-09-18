import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCol,
    IonGrid, IonIcon,
    IonImg, IonRow
} from "@ionic/react";
import './Welcome.css';
import {AttentionSeeker, Slide} from "react-awesome-reveal";
import {ticket} from "ionicons/icons";


const Welcome: React.FC = () => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="5" sizeXs="8" sizeLg="5" className="logo-image">
                    <IonImg src={"/assets/img/Logo.png"}/>
                </IonCol>
                <IonCol className="ion-text-center" size="6" sizeXs="12" sizeLg="6">
                    <h1 className="solottery-title">Introducing Solottery</h1>
                    The first Solana NFT lottery
                    <br/>
                    Are you ready to gamble?
                    <br/>
                    <br/>
                    Join our community!
                    <br/>
                    <a href="https://twitter.com/solottery_nft">Twitter</a> and <a href="https://discord.gg/NpxR7NUtnA">Discord</a>
                    <br/>
                    Good luck!
                    <br/>
                    <br/>
                    <br/>

                    <AttentionSeeker effect={'tada'}>
                        <IonButton color={'danger'} routerLink="/mint">
                            <IonIcon slot="start" icon={ticket}/>
                            MINT NOW!</IonButton>
                    </AttentionSeeker>

                </IonCol>
            </IonRow>
        </IonGrid>

    );
};

export default Welcome;
