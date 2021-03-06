import {TraitModel} from "./trait.model";

export interface LotteryTicket {
    img: string;
    playMultiplier: TraitModel;
    winMultiplier: TraitModel;
    ticketType: TraitModel;
    rarityTotal: number;
    rarityRank: number;
    name: string;
    owner: string;
    mint: string;
}
