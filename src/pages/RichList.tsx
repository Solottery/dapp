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
import "./Gallery.css";
import {useContext, useEffect, useState} from "react";
import {useWallet} from "@solana/wallet-adapter-react";
import Wallet from "../components/Wallet";
import RichListTable from "../components/RichListTable";
import {OwnerModel} from "../models/owner-model";
import {OwnerListContext, OwnerListProvider} from "../hooks/useOwnerList";

const RichList: React.FC = () => {

    const wallet = useWallet();
    const [present] = useIonToast();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 720)
    const owners = useContext<OwnerModel[]>(OwnerListContext);

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
                                    <IonTitle className={'header-item-gallery-left'}>Rich List</IonTitle>
                                </IonCol>
                                <IonCol/>
                                <IonCol className={'header-item-gallery-right'}>
                                    <Wallet/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <RichListTable owners={owners}
                                   isMobile={isMobile}/>
                </IonContent>
            </IonPage>
    );
};

export default RichList;
