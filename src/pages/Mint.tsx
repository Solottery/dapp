import MintButton from "../components/MintButton";
import {
    IonButtons,
    IonCard,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import Wallet from "../components/Wallet";
import './Mint.css';


const Mint: React.FC = () => {


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonButtons slot="end">
                        <Wallet/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol class="center-grid">
                            <IonCard id="mint-card">
                                <IonImg src="assets/img/4461.png"/>
                                <IonCardHeader className="ion-align-self-center">
                                    <IonCardTitle id="mint-card-title">
                                        Genesis Solottery Ticket
                                    </IonCardTitle>
                                    <IonCardSubtitle className='mint-card-subtitle'>
                                        0.1 SOL per Ticket
                                    </IonCardSubtitle>
                                </IonCardHeader>
                                <MintButton/>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Mint;
