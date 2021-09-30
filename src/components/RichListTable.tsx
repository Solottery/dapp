import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import "./ViewerList.css";
import {useWallet} from "@solana/wallet-adapter-react";
import {OwnerModel} from "../models/owner-model";
import RichListItem from "./RichListItem";

export interface RichListProps {
    owners: OwnerModel[],
    isMobile: boolean
}

const RichListTable: (props: RichListProps) => JSX.Element = (props: RichListProps) => {

    type sortType = 'asc' | 'desc';

    function descendingComparator(a: OwnerModel, b: OwnerModel, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const headCells = [
        {
            id: 'holder_rank',
            numeric: true,
            disablePadding: false,
            label: 'Ticket Rank',
            visible: true
        },
        {
            id: 'weight_rank',
            numeric: true,
            disablePadding: false,
            label: 'Weight Rank',
            visible: true
        },
        {
            id: 'address',
            numeric: true,
            disablePadding: false,
            label: 'Address',
            visible: true
        },
        {
            id: 'tickets',
            numeric: true,
            disablePadding: false,
            label: 'Tickets',
            visible: !props.isMobile
        },
        {
            id: 'ticket_weight',
            numeric: true,
            disablePadding: false,
            label: 'Ticket Weight',
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
                {props?.owners
                    .sort(getComparator(order, orderBy))
                    .map((row, index) =>
                        <RichListItem key={index}
                                      index={index}
                                      isMobile={props.isMobile}
                                      owner={row}/>
                    )}
            </TableBody>
        </Table>
    );
};

export default RichListTable;
