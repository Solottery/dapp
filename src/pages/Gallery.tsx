import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonToast
} from "@ionic/react";
import ViewerList from "../components/ViewerList";
import {FormControlLabel, Switch} from "@mui/material";
import "./Gallery.css";
import {useEffect, useState} from "react";
import {useWallet} from "@solana/wallet-adapter-react";
import Wallet from "../components/Wallet";

const Gallery: React.FC = () => {
    const [checked, setChecked] = useState(false);
    const wallet = useWallet();
    const [present] = useIonToast();

    const handleChange = async (event) => {
        if (!wallet?.publicKey) {
            await present('Connect wallet first', 500);
            return;
        }
        setChecked(event.target.checked);
    }

    const [isMobile, setIsMobile] = useState(false)

//choose the screen size
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

// create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>

                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonTitle className={'header-item-gallery-left'}>Minted Tickets</IonTitle>
                            </IonCol>
                            <IonCol className={'header-item-gallery'}>
                                <FormControlLabel control={<Switch onChange={handleChange} color='warning'/>}
                                                  label="Only my Tickets"/>
                            </IonCol>
                            <IonCol className={'header-item-gallery-right'}>
                                <Wallet/>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <ViewerList onlyMine={checked} isMobile={isMobile}/>
            </IonContent>
        </IonPage>
    );
};

export default Gallery;
