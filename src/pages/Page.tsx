import {
    IonAvatar, IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader, IonIcon, IonImg,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import './Page.css';
import RoadMap from "../components/RoadMap";
import FAQ from "../components/FAQ";
import Tickets from "../components/Tickets";
import UltraRares from "../components/UltraRares";
import Welcome from "../components/Welcome";
import {logoDiscord, logoGithub, logoTwitter} from "ionicons/icons";


const Page: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <Welcome />
                <div>
                    <h1>ROADMAP</h1>
                </div>

                <RoadMap/>
                <Tickets/>
                <UltraRares/>
                <FAQ/>
                <IonFooter>
                    <IonToolbar>
                        <div className="ion-text-center">
                            <IonButton shape="round" href="https://discord.gg/NpxR7NUtnA">
                                <IonIcon icon={logoDiscord} />
                            </IonButton>
                            <IonButton shape="round" href="https://twitter.com/solottery_nft">
                                <IonIcon icon={logoTwitter} />
                            </IonButton>
                            <IonButton shape="round" href="https://github.com/Solottery/dapp">
                                <IonIcon  icon={logoGithub} />
                            </IonButton>
                        </div>
                    </IonToolbar>
                </IonFooter>
            </IonContent>

        </IonPage>
    );
};

export default Page;
