import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar} from "@ionic/react";
import {useContext} from "react";
import {RouteComponentProps} from "react-router";
import {OwnerModel} from "../models/owner-model";
import {OwnerListContext} from "../hooks/useOwnerList";
import OwnerDetail from "../components/OwnerDetail";

interface OwnerDetailViewProps
    extends RouteComponentProps<{
        id: string;
    }> {
}

const ViewerDetailView: (props: OwnerDetailViewProps) => JSX.Element = (props: OwnerDetailViewProps) => {

    const owners = useContext<OwnerModel[]>(OwnerListContext);

    const getOwnerByAddress = (owner: OwnerModel) => {
        return owner.address === props.match?.params?.id;
    }

    const ownerExists = (name: string): boolean => {
        if (!props.match?.params?.id) {
            return false;
        }

        let index = owners.findIndex(getOwnerByAddress);
        if (!index) {
            return false;
        }

        let owner = owners[index]

        if (!owner) {
            return false;
        }

        return true;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className={'title-text'}>Owner Details</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {ownerExists ?
                    <OwnerDetail owner={owners[owners.findIndex(getOwnerByAddress)]}/> :
                    <IonText>Loading</IonText>
                }
            </IonContent>
        </IonPage>
    );
};

export default ViewerDetailView;
