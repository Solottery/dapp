import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow} from "@ionic/react";
import Ticket from "./Ticket";
import {JackInTheBox, Slide} from "react-awesome-reveal";

const ultraRare = [
    {
        "name": "Spliffy",
        "img": "420.png",
        "amount": 1,
        "border": "green",
        "description": "The reason we designed this NFT is probably illegal in your country."
    },
    {
        "name": "69",
        "img": "69.png",
        "amount": 1,
        "border": "red",
        "description": "69 – like working on your day off."
    },
]


const UltraRares: React.FC = () => {
    return (
        <div>
            <h1 className="center-title">Ultra Rares</h1>
            <IonGrid>
                <IonRow>
                    {ultraRare.map((img, index) =>
                        <IonCol key={img.name}>
                            <JackInTheBox>
                                <Ticket img={img.img}
                                        amount={img.amount}
                                        description={img.description}
                                        name={img.name}/>
                            </JackInTheBox>
                        </IonCol>
                    )}
                </IonRow>
            </IonGrid>
        </div>

    );
};

export default UltraRares;
