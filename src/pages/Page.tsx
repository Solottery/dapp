import {
    IonButtons, IonContent,
    IonHeader, IonMenuButton,
    IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Page.css';
import RoadMap from "../components/RoadMap";
import FAQ from "../components/FAQ";
import Tickets from "../components/Tickets";
import UltraRares from "../components/UltraRares";
import Welcome from "../components/Welcome";
import {ParallaxBanner} from "react-scroll-parallax";


const Page: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className={'title-text'}>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <ParallaxBanner
                    className="your-class"
                    layers={[
                        {
                            image: 'solotter-frontend/assets/img/background.png',
                            amount: 0,
                        },
                    ]}
                    style={{
                        height: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'auto'
                    }}
                >
                    <Welcome/>
                </ParallaxBanner>

                <RoadMap/>
                <Tickets/>
                <UltraRares/>
                <FAQ/>
            </IonContent>

        </IonPage>
    );
};

export default Page;
