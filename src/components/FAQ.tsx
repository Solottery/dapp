import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        acordionBackground: {
            backgroundColor: '#90A4AE'
        }
    }),
);

const FAQ: React.FC = () => {
    const classes = useStyles();
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    FAQ
                </IonCardTitle>
                <IonCardContent>
                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Why did you choose the solana chain?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                We learnt to love the solona chain as we first minted our lovely NFTs. Furthermore we
                                choose solana for the speed and the low cost.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>How does the presale work?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                In the presale phase there will be 200 tickets to mint. Afterwards we draw the first
                                solottery winner in history.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>When does the main sale start?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Right after the presale winner is determined we will start the sale of the remaining
                                9’800 NFTs.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>Why is there not just one big jackpot?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                We liked this project since the beginning and so will you. If we only chose one winner
                                then the whole lottery will be over. We decided to run the lottery over a longer period
                                of time.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>How much can be won?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                It varies, we will manage our jackpot funds carefully so we can run the project over a
                                long time. Most of the prices are Solana coins but we plan to make special jackpots with
                                NFTs. The amount which can be won will be published right after the announcement of the
                                previous winner. Take a lock at the rare NFTs where the jackpot can get multiplied up to
                                x2.

                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>What’s the price for one ticket in the secondary
                                market?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                As you already guess it – the market will decide. But you should remember the fact that
                                we generate lucky winners on a regular basis. As long as the lottery is going on the
                                tickets will have an intrinsic value. If you take a glance at the NFT markets, there is
                                a lot of art where the price is determined by the taste of the buyer.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>What is up with the rare NFTs?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                The rare NFTs multiply your chance to win and / or the jackpot if you win. More details
                                are published under the menu item “rare”.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default FAQ;
