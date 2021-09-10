import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow} from "@ionic/react";
import Ticket from "./Ticket";

const images = [
    {
        "name": "Salmon Star",
        "img": "2323.png",
        "amount": 500,
        "description": "",
    },
    {
        "name": "Blue Star",
        "img": "BlueStar.png",
        "amount": 500,
        "description": "",
    },
    {
        "name": "Boring Green",
        "img": "Greenasfuck.png",
        "amount": 3000,
        "description": "",
    },
    {
        "name": "Golden Shower",
        "img": "Irgendäfarb.png",
        "amount": 1000,
        "description": "",
    },
    {
        "name": "Art",
        "img": "Kaligrafeshit.png",
        "amount": 111,
        "description": "",
    },
    {
        "name": "Diamond Star",
        "img": "money.png",
        "amount": 10,
        "description": "",
    },
    {
        "name": "Trippy",
        "img": "pink.png",
        "amount": 77,
        "description": "",
    },
    {
        "name": "Boring Red",
        "img": "Rot.png",
        "amount": 1500,
        "description": "",
    },
    {
        "name": "Snail",
        "img": "rotrot.png",
        "amount": 200,
        "description": "",
    },
    {
        "name": "Nearly a Rainbow",
        "img": "test.png",
        "amount": 100,
        "description": "",
    },
    {
        "name": "Eyedestroyer",
        "img": "Eyedestroyer.png",
        "amount": 3000,
        "description": "",
    },
]

const FAQ: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Tickets
                </IonCardTitle>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            {images.map((img, index) =>
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

export default FAQ;
