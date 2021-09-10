import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Ticket.css';


const Welcome: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle className='card-title-center'>
                    Introdoucing Solottery
                </IonCardTitle>
                <IonCardSubtitle className='card-title-center'>
                    The first Solana NFT lottery
                </IonCardSubtitle>
                <IonCardContent>
                    <br/>
                    We throw the ticket revenues in a pot called Jack. <br/>
                    The genesis collection will be valid for all the coming drawings.<br/>
                    There will be weekly or more frequent lotteries with one or multiple winners.
                    <br/>
                    We will listen closely to the wishes of the community.
                    <br/>
                    <br/>
                    <br/>
                    Do you already feel the urge to mint your own ticket to a better life?
                    <br/>
                    Do it now before we are sold out.
                    <br/>

                    Join our community!
                    <br/>
                    <a href="https://twitter.com/solottery_nft">Twitter</a> and <a href="https://discord.gg/CwUktFyju9">Discord</a>
                    <br/>
                    Good luck!

                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default Welcome;
