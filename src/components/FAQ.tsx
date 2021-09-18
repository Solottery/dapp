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
            fontSize: theme.typography.pxToRem(20),
            fontWeight: theme.typography.fontWeightRegular,
        },
        acordionBackground: {
            backgroundColor: '#063A8C',
            color: 'white'
        }
    }),
);

const FAQ: React.FC = () => {
    const classes = useStyles();
    return (
        <div>
            <h1 className="center-title">FAQ</h1>
            <Accordion className={classes.acordionBackground}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>What is the Solottery?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        The Solottery will be a NFT based lottery on Solana.
                        <br/>
                        We plan to make frequent lotteries with the money from ticket sales.
                        <br/>
                        The prices will be selected by our DAO.
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
                        In the presale phase there will be 200 tickets to mint. <br/>
                        Afterwards we draw the first Solottery winner in history.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={classes.acordionBackground}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>What are the benefits of the presale?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Presale buyers will be the participate in the first lottery.<br/>
                        Because there are only 200 Tickets in the presale the chances of winning are very high. <br/>
                        Later there will be more benefits in form of airdrops etc. for our early supporters.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={classes.acordionBackground}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>How much is a presale ticket?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Our presale tickets only cost 0.1 Sol!
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={classes.acordionBackground}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Is it save?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes our project uses the metaplex candymachine and our dapp is open source!
                        <br/>
                        We strive to make contributions to the solana ecosystem.
                    </Typography>
                </AccordionDetails>
            </Accordion>




            <Accordion className={classes.acordionBackground}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>What are the multipliers?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        There are two multiplier attributes in each ticket.<br/>
                        <br/>
                        The play multiplier gives a ticket a certain weigth in the lottery. <br/>
                        If you ticket has the play multiplier of 2 its two entries in the lottery for you.
                        <br/>
                        <br/>
                        The win multiplier will make your winnings bigger. <br/>
                        If the jackpot is 10 sol and you win with the rarest ticket which has a win multiplier of
                        2, you win 20 sol!
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
                        then the whole lottery would be over. We decided to run the lottery over a longer period
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
                        previous winner. Take a look at the rare NFTs where the jackpot can get multiplied up to
                        x2. Later the prices will be decided by the Solottery DAO.
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>

    );
};

export default FAQ;
