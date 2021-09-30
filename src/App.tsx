import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Redirect, Route} from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Mint from "./pages/Mint";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {getPhantomWallet, getSolflareWallet} from "@solana/wallet-adapter-wallets";
import Lottery from "./pages/Lottery";
import Gallery from "./pages/Gallery";
import {TicketListProvider} from "./hooks/useTicketList";
import ViewerDetailView from "./pages/ViewerDetailView";
import RichList from "./pages/RichList";
import {OwnerListProvider} from "./hooks/useOwnerList";
import OwnerDetailView from "./pages/OwnerDetailView";

const App: React.FC = () => {

    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(() => [
        getPhantomWallet(),
        getSolflareWallet(),
    ], []);

    return (
        <IonApp>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={true}>
                    <WalletModalProvider logo="./assets/img/Logo.png">

                        <IonReactRouter basename={process.env.PUBLIC_URL}>
                            <TicketListProvider>
                                <OwnerListProvider>
                                    <IonSplitPane contentId="main" when={false}>
                                        <Menu/>
                                        <IonRouterOutlet id="main">
                                            <Route path="/" exact={true}>
                                                <Redirect to="/home"/>
                                            </Route>
                                            <Route path="/dapp" exact={true}>
                                                <Redirect to="/home"/>
                                            </Route>
                                            <Route path="/home" exact={true}>
                                                <Page/>
                                            </Route>
                                            <Route path="/mint">
                                                <Mint/>
                                            </Route>
                                            <Route path="/lottery">
                                                <Lottery/>
                                            </Route>
                                            <Route path="/gallery" component={Gallery}/>
                                            <Route path="/viewer/:id" component={ViewerDetailView}/>


                                            <Route path="/richList" component={RichList}/>
                                            <Route path="/owner/:id" component={OwnerDetailView}/>


                                        </IonRouterOutlet>
                                    </IonSplitPane>
                                </OwnerListProvider>
                            </TicketListProvider>
                        </IonReactRouter>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </IonApp>
    );
};

export default App;
