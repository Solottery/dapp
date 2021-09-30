import {LotteryTicket} from "./lottery-ticket";

export interface OwnerModel {
    address: string;
    tickets: number;
    ticket_weight: number;
    ticket_list: LotteryTicket[];
    holder_rank: number;
    weight_rank: number;
}
