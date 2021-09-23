import {LotteryTicket} from "./lottery-ticket";

export interface TicketListModel {
    tickets: Map<string, LotteryTicket>;
    amount: number;
}

export interface SerializableTicketList {
    tickets: [],
    amount: number
}
