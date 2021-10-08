import "./Winner.css";
import {IonText} from "@ionic/react";

export interface WinningChanceProps {
    winningChance: number
}

const Winner: (props: WinningChanceProps) => JSX.Element = (props: WinningChanceProps) => {
    if (props?.winningChance != -1) {
        return (
            <div className={'card-title-center'}>
                <h2 className={'card-title-center'}>Winning Chance</h2>
                <br/>
                <p>{props?.winningChance}</p>
                <br/>
            </div>
        )
    }
    return null;
};
export default Winner;
