import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import {Slide} from "react-awesome-reveal";
import './RoadMap.css';

const RoadMap: React.FC = () => {
    return (
        <div>
            <h1 className="center-title">Roadmap</h1>

            <div className="roadmapCardLeft">
                <Slide>
                    <IonCard className='road-map-card'>
                        <IonCardHeader>
                            <IonCardTitle>
                                1. The Presale
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Ultra limited selection of 200 Tickets. <br/>
                            Many benefits to come for early adopters :)
                        </IonCardContent>
                    </IonCard>
                </Slide>
            </div>

            <div className="roadmapCardRight">
                <Slide direction={'right'}>
                    <IonCard className='road-map-card'>
                        <IonCardHeader>
                            <IonCardTitle>
                                2. The first Jackpot
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Are the odds with you? The first drawing will reveal it. <br/>
                            This lottery is exclusively for our presale buyers.<br/>
                        </IonCardContent>
                    </IonCard>
                </Slide>
            </div>


            <div className="roadmapCardLeft">
                <Slide>
                    <IonCard className='road-map-card'>
                        <IonCardHeader>
                            <IonCardTitle>
                                3. The Genesis Sale
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Complete the collection with the Genesis Sale Tickets<br/>
                        </IonCardContent>
                    </IonCard>
                </Slide>
            </div>


            <div className="roadmapCardRight">
                <Slide direction={'right'}>
                    <IonCard className='road-map-card'>
                        <IonCardHeader>
                            <IonCardTitle>
                                4. Lottery Dapp and DAO
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            The Lottery Dapp will be used for fair and transparent lotteries and make burner tickets possible.
                            <br/>
                            More on that in the next step!
                            <br/>
                            <br/>
                            The DAO will be in charge of selecting
                            the jackpots and making it the most exciting lottery in the world!
                        </IonCardContent>
                    </IonCard>
                </Slide>
            </div>

            <div className="roadmapCardLeft">
                <Slide>
                    <IonCard className='road-map-card'>
                        <IonCardHeader>
                            <IonCardTitle>
                                5. Burner Tickets
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Create and sell burner tickets only valid for one Lottery.
                        </IonCardContent>
                    </IonCard>
                </Slide>
            </div>

            <div className="roadmapCardRight">
                <Slide direction={'right'}>
                    <IonCard className='road-map-card'>
                        <IonCardHeader>
                            <IonCardTitle>
                                6. The expanding
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Become the best and biggest lottery in the world!
                        </IonCardContent>
                    </IonCard>
                </Slide>
            </div>
        </div>
    );
};

export default RoadMap;
