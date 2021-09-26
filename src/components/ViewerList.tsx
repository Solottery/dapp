import {useContext, useState} from "react";
import {TicketListContext} from "../hooks/useTicketList";
import {LotteryTicket} from "../models/lottery-ticket";
import ViewerListItem from "./ViewerListItem";
import {Box, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import "./ViewerList.css";
import {useWallet} from "@solana/wallet-adapter-react";

export interface ViewerListProps {
    onlyMine: boolean;
    isMobile: boolean;
}

const ViewerList: (props: ViewerListProps) => JSX.Element= (props: ViewerListProps) => {

    type sortType = 'asc' | 'desc';

    const tickets = useContext<LotteryTicket[]>(TicketListContext);

    const filterTickets = (ticket: LotteryTicket) => {
        return !wallet?.publicKey || !props.onlyMine || ticket.owner === wallet?.publicKey.toString();
    }

    function descendingComparator(a: LotteryTicket, b: LotteryTicket, orderBy) {
        if(orderBy == 'ticket' ||  orderBy == 'number'){
            if (b.name < a.name) {
                return -1;
            }
            if (b.name > a.name) {
                return 1;
            }
        }else if (orderBy == 'play'){
            if (b.playMultiplier.value < a.playMultiplier.value) {
                return -1;
            }
            if (b.playMultiplier.value > a.playMultiplier.value) {
                return 1;
            }
        }else if (orderBy == 'win'){
            if (b.winMultiplier.value < a.winMultiplier.value) {
                return -1;
            }
            if (b.winMultiplier.value > a.winMultiplier.value) {
                return 1;
            }
        }else{
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
        }
        return 0;
    }

    const headCells = [
        {
            id: 'rarityRank',
            numeric: true,
            disablePadding: false,
            label: 'Rank',
            visible: true
        },
        {
            id: 'ticket',
            numeric: true,
            disablePadding: false,
            label: 'Ticket',
            visible: true
        },
        {
            id: 'number',
            numeric: true,
            disablePadding: false,
            label: 'Number',
            visible: !props.isMobile
        },
        {
            id: 'play',
            numeric: true,
            disablePadding: false,
            label: 'Play Multiplier',
            visible: !props.isMobile
        },
        {
            id: 'win',
            numeric: true,
            disablePadding: false,
            label: 'Win Multiplier',
            visible: !props.isMobile
        },
    ];

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const [orderBy, setOrderBy] = useState('rank');
    const [order, setOrder] = useState<sortType>('asc');

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const wallet = useWallet();

    return (
        <Table sx={{minWidth: 100}} stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    {headCells.filter(t => t.visible).map((headCell) => (
                        <TableCell align="center"
                                   className={'lottery-table-header'}
                                   key={headCell.id}
                                   sortDirection={orderBy === headCell.id ? order : false}>
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tickets
                    .filter(filterTickets)
                    .sort(getComparator(order, orderBy))
                    .map((row, index) =>
                        <ViewerListItem isMobile={props.isMobile}
                                        key={index}
                                        index={index}
                                        ticket={row}/>
                    )}
            </TableBody>
        </Table>
    );
};

export default ViewerList;
