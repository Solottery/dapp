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
import {useEffect, useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {getPhantomWallet, getSolflareWallet} from "@solana/wallet-adapter-wallets";
import {ParallaxProvider} from "react-scroll-parallax";
import Rarity from "./pages/Rarity";
import Lottery from "./pages/Lottery";

const App: React.FC = () => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(() => [
        getPhantomWallet(),
        getSolflareWallet(),
    ], []);

    useEffect(() => {
        document.body.classList.toggle('dark');
        console.log("dark");
    })

    return (
        <IonApp>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={true}>
                    <WalletModalProvider>
                        <ParallaxProvider>
                            <IonReactRouter basename={process.env.PUBLIC_URL}>
                                <IonSplitPane contentId="main">
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
                                        <Route path="/rarity">
                                            <Rarity/>
                                        </Route>
                                        <Route path="/lottery">
                                            <Lottery/>
                                        </Route>
                                    </IonRouterOutlet>
                                </IonSplitPane>
                            </IonReactRouter>
                        </ParallaxProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </IonApp>
    );
};

export default App;
