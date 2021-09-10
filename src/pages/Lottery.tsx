import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonContent,
    IonHeader,
    IonMenuButton, IonPage, IonTitle,
    IonToolbar
} from "@ionic/react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ParallaxBanner} from "react-scroll-parallax";
import Welcome from "../components/Welcome";
import RoadMap from "../components/RoadMap";
import Tickets from "../components/Tickets";
import UltraRares from "../components/UltraRares";
import FAQ from "../components/FAQ";


const Lottery: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className={'title-text'}>Lottery Dapp</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonCard>
                    <IonCardContent>
                        Coming soon...
                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>
    );
};

export default Lottery;
