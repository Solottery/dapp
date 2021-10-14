import {IonButtons, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonToolbar} from "@ionic/react";
import Wallet from "../components/Wallet";
import './GiveAway.css';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {SyntheticEvent, useContext, useEffect, useState} from "react";
import GiveAwayCard from "../components/GiveAwayCard";
import {LotteryModel} from "../models/lotter.model";
import {GiveAwayListContext} from "../hooks/useGiveAwayList";
import {TicketListContext} from "../hooks/useTicketList";
import {useWallet} from "@solana/wallet-adapter-react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const GiveAway: React.FC = () => {
    const [value, setValue] = useState(0);

    const [currentGiveAway, setCurrentGiveAway] = useState<LotteryModel>({assets: []} as LotteryModel);
    const [upcomingGiveAways, setUpcomingGiveAways] = useState<LotteryModel[]>([]);
    const [pastGiveAways, setPastGiveAways] = useState<LotteryModel[]>([]);


    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const giveAways = useContext<LotteryModel[]>(GiveAwayListContext);
    const tickets = useContext(TicketListContext);

    const [winningChance, setWinningChance] = useState(0);
    const wallet = useWallet();

    useEffect(() => {

        let amount = tickets.map(t => Number(t.playMultiplier.value));
        let sumAmount = 0;
        for (let i in amount) {
            sumAmount = sumAmount + amount[i];
        }

        if (wallet?.publicKey) {
            const userTickets = tickets
                .filter(t => t.owner == wallet.publicKey.toString())
                .map(t => Number(t.playMultiplier.value));

            let userAmount = 0;
            for (let i in userTickets) {
                userAmount = userAmount + userTickets[i];
            }
            setWinningChance(100 / sumAmount * userAmount);
        } else {
            setWinningChance(-1);
        }
    }, [wallet, tickets, winningChance, setWinningChance])


    useEffect(() => {
        if (giveAways) {
            giveAways.sort((a, b) => {
                if (a.time > b.time) {
                    return 1;
                }
                if (a.time < b.time) {
                    return -1;
                }
                return 0;
            });

            let future = giveAways;
            future = future.filter(g => new Date(g.time) > new Date());
            let past = giveAways.filter(g => new Date(g.time) < new Date());
            past.sort((a, b) => {
                if (a.time < b.time) {
                    return 1;
                }
                if (a.time > b.time) {
                    return -1;
                }
                return 0;
            });
            setUpcomingGiveAways(future.slice(1));

            if (future.length == 0) {
                if (past.length != 0) {
                    setCurrentGiveAway(past[0]);
                }
            } else {
                setCurrentGiveAway(future[0]);
            }
            setPastGiveAways(past);
        }
    }, [giveAways, setCurrentGiveAway, setUpcomingGiveAways, setPastGiveAways]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonButtons slot="end">
                        <Wallet/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab className={'tab-title-color'} label="Lottery"/>
                        <Tab  className={'tab-title-color'} label="Upcoming"/>
                        <Tab  className={'tab-title-color'} label="Past"/>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <GiveAwayCard winningChance={winningChance} ticket={currentGiveAway} index={0}/>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    {upcomingGiveAways.map(value => {
                        return <GiveAwayCard winningChance={winningChance}
                                             key={value.id}
                                             index={value.id}
                                             ticket={value}/>;
                    })}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <IonGrid>

                            {pastGiveAways.map(value => {
                                return <IonRow><GiveAwayCard winningChance={winningChance}
                                                     key={value.id}
                                                     index={value.id}
                                                     ticket={value}/></IonRow>;
                            })}

                    </IonGrid>

                </TabPanel>
            </IonContent>
        </IonPage>
    );
};

export default GiveAway;
