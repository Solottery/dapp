import {IonImg, useIonRouter} from "@ionic/react";
import {LotteryTicket} from "../models/lottery-ticket";
import {TableCell, TableRow} from "@mui/material";
import "./ViewerListItem.css";

export interface TicketItemProps {
    index: number,
    ticket: LotteryTicket,
}

const ViewerListItem: (props: TicketItemProps) => JSX.Element = (props: TicketItemProps) => {

    const router = useIonRouter();

    const onItemClick = (index: number) => {
        router.push("viewer/" + String(props.ticket.name.replace("Ticket: ", "")));
    }

    return (
        <TableRow
            hover
            onClick={() => onItemClick(props.index)}
            key={props.index}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row" align="center">
                {props.ticket.rarityRank}
            </TableCell>
            <TableCell align="center"><IonImg id="ticket-image-in-table" src={props.ticket.img}/></TableCell>
            <TableCell align="center">{props.ticket.name}</TableCell>
            <TableCell align="center">{props.ticket.playMultiplier.value}</TableCell>
            <TableCell align="center">{props.ticket.winMultiplier.value}</TableCell>
        </TableRow>
    );
};

export default ViewerListItem;