import {useIonRouter} from "@ionic/react";
import {TableCell, TableRow} from "@mui/material";
import {OwnerModel} from "../models/owner-model";
import "./ViewerListItem.css";

export interface RichListItemProps {
    index: number,
    owner: OwnerModel,
    isMobile: boolean
}

const RichListItem: (props: RichListItemProps) => JSX.Element = (props: RichListItemProps) => {

    const router = useIonRouter();

    const onItemClick = (index: number) => {
        router.push("owner/" + props?.owner?.address);
    }

    const getTableColumns = () => {
        if (props.isMobile) {
            return (
                <TableRow
                    hover
                    onClick={() => onItemClick(props.index)}
                    key={props.index}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell align="center" className={'row-item'}>{props.owner.holder_rank} </TableCell>
                    <TableCell align="center" className={'row-item'}>{props.owner.weight_rank}</TableCell>
                    <TableCell component="th" scope="row" align="center" className={'row-item'}>
                        <a href={'https://explorer.solana.com/address/' + props.owner.address} className={'row-item'}>
                            {props.owner.address.substring(0, 3) + '...' + props.owner.address.substring(props.owner.address.length - 3, props.owner.address.length)}</a>
                    </TableCell>
                </TableRow>
            )
        } else {
            return (
                <TableRow
                    hover
                    onClick={() => onItemClick(props.index)}
                    key={props.index}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell className={'row-item'} align="center">{props.owner.holder_rank}</TableCell>
                    <TableCell className={'row-item'} align="center">{props.owner.weight_rank}</TableCell>
                    <TableCell component="th" scope="row" align="center" className={'row-item'}>
                        <a className={'row-item'} href={'https://explorer.solana.com/address/' + props.owner.address}>
                            {props.owner.address}</a>
                    </TableCell>
                    <TableCell className={'row-item'} align="center">{props.owner.tickets}</TableCell>
                    <TableCell className={'row-item'} align="center">{props.owner.ticket_weight}</TableCell>
                </TableRow>);
        }

    }

    return (
        getTableColumns()
    );
};

export default RichListItem;
