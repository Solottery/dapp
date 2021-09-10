import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow} from "@ionic/react";
import Ticket from "./Ticket";

const ultraRare = [
    {
        "name": "Spliffy",
        "img": "420.png",
        "amount": 1,
        "border": "green",
        "description": ""
    },
    {
        "name": "69",
        "img": "69.png",
        "amount": 1,
        "border": "red",
        "description": ""
    },
]


const UltraRares: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    THE ULTRA RARES
                </IonCardTitle>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            {ultraRare.map((img, index) =>
                                <IonCol>
                                    <Ticket img={img.img}
                                            amount={img.amount}
                                            description={img.description}
                                            name={img.name}/>
                                </IonCol>
                            )}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default UltraRares;
