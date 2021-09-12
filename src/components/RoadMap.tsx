import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


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


const RoadMap: React.FC = () => {
    const classes = useStyles();
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Roadmap
                </IonCardTitle>
                <IonCardContent>
                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>1. The presale</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                To evaluate interests and reward early investors we start a presale with 200 Tickets.<br/>
                                These tickets are randomly selected from the genesis collection of 10.000 Tickets.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>2. The first jackpot</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Are the odds with you? The first drawing will reveal it. <br/>
                                Don’t waste the chance to win your own fortune!
                                As soon as the presale is over,
                                the first winner in the history of Solana NFT lotterys will get his wallet filled with sweet,
                                sweet jackpot cash.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>3. The Genesis sale</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                The main sale with the remaining 9’800 tickets will
                                open after the presale winner is announced.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>4. Lottery Dapp and DAO</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                After the sale finishes we will start with lotteries and begin to
                                build a DAO with our community. <br/>
                                This DAO will be in charge of selecting
                                the jackpots and how we will spend
                                the money to make the most exciting lotteries in the world!
                            </Typography>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>5. The fee lottery</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Release of our additional one-way tickets.<br/>
                                These tickets will only be valid once and will be burned if used for a lottery. <br/>
                                The first row will be an airdrop to the owner addresses of the genesis NFTs.<br/>
                                The Pot will be filled with fees from marketplace trading.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>6. The expanding</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Explorer more gaming related use cases for our NFT's and continue with
                                great lotteries founded by sales fees and one way lottery tickets.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default RoadMap;
