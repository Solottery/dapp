import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow} from "@ionic/react";
import Ticket from "./Ticket";

const images = [
    {
        "name": "Salmon Star",
        "img": "2323.png",
        "amount": 500,
        "description": "It will make you rich or give you salmonella",
    },
    {
        "name": "Blue Star",
        "img": "BlueStar.png",
        "amount": 500,
        "description": "Lock up in the sky, it’s a bird? It’s a plane? No it’s not. It’s dark outside, all you see are stars.",
    },
    {
        "name": "Boring Green",
        "img": "Greenasfuck.png",
        "amount": 3000,
        "description": "Green was my favourite color. Since I designed this NFT I am convinced that green is boring. ",
    },
    {
        "name": "Golden Shower",
        "img": "Irgendäfarb.png",
        "amount": 1000,
        "description": "The golden shower – some like it, others don’t.",
    },
    {
        "name": "Art",
        "img": "Kaligrafeshit.png",
        "amount": 111,
        "description": "Like my grandpa always said: A rousing line a day change the cash to pain. Or something like that. I don’t remember it clearly because of my line addiction.",
    },
    {
        "name": "Diamond Star",
        "img": "money.png",
        "amount": 10,
        "description": "Do you have the diamond hands to hodl this masterpiece?",
    },
    {
        "name": "Trippy",
        "img": "pink.png",
        "amount": 77,
        "description": "Look at this for two hours and you can hear colors",
    },
    {
        "name": "Boring Red",
        "img": "Rot.png",
        "amount": 1500,
        "description": "Sdgfljmksgtrkokoöi – sorry my head fell on the keyboard because I felt asleep just by looking at this boring red. ",
    },
    {
        "name": "Snail",
        "img": "rotrot.png",
        "amount": 200,
        "description": "Slow but steady to the jackpot",
    },
    {
        "name": "Nearly a Rainbow",
        "img": "test.png",
        "amount": 100,
        "description": "This could be a rainbow but we decided to disappoint you.",
    },
    {
        "name": "Eyedestroyer",
        "img": "Eyedestroyer.png",
        "amount": 3000,
        "description": "This NFT is like the sun. You can lose your ability to see just by looking at it. ",
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
