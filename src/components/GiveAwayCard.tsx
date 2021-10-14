import {IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonRow, IonText} from "@ionic/react";
import {LotteryModel} from "../models/lotter.model";
import Countdown from "react-countdown";
import {JackInTheBox} from "react-awesome-reveal";
import NFT from "./NFT";
import Token from "./Token";
import "./GiveAwayCard.css";
import Winner from "./Winner";
import WinningChance from "./WinningChance";
import {useEffect, useState} from "react";

export interface GiveAwayCardProps {
    index: number;
    ticket: LotteryModel;
    winningChance: number;
}

const GiveAwayCard: (props: GiveAwayCardProps) => JSX.Element = (props: GiveAwayCardProps) => {

    const [time, setTime] = useState<string>(null);

    useEffect(() => {
        if(props?.ticket?.time){
            setTime(new Date(props?.ticket?.time).toUTCString());
        }else{
            setTime('Loading...')
        }
    }, [setTime, props])

    return (
        <IonCard className={'give-away-card'}>
            <IonCardHeader className={'ion-text-center'}>
                {props?.ticket?.time && !props?.ticket?.finished ? <Countdown date={props?.ticket?.time} className={'countdown-timer'}/> :
                    <h1 className={'card-title-center'}>{time}</h1>}

                <h1 className={'card-title-center'}>{props?.ticket?.name ?? 'Not found'}</h1>
            </IonCardHeader>

            <IonCardContent className={'ion-text-center'}>
                <IonText className={'centered-text'}>
                    {props?.ticket?.description}
                </IonText>
                <br/>
                <br/>
                {props?.ticket?.finished ? <Winner winner={props?.ticket?.winner}/> : null}

                <WinningChance winningChance={props?.winningChance}/>

                <h1 className={'card-title-center'}>Jackpot</h1>
                <IonGrid>
                    <IonRow className={'centered-row'}>
                        {props?.ticket?.assets.map((asset, index) =>
                            <IonCol key={asset.name} className={'jack-pot-item'}>
                                <JackInTheBox>
                                    {asset?.nft ? <NFT asset={asset}/> : <Token asset={asset}/>}
                                </JackInTheBox>
                            </IonCol>
                        )}
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default GiveAwayCard;
