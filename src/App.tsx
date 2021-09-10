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
import {ParallaxProvider} from "react-scroll-parallax";

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

    return (
        <IonApp>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={true}>
                    <WalletModalProvider>
                        <ParallaxProvider>
                            <IonReactRouter>
                                <IonSplitPane contentId="main">
                                    <Menu/>
                                    <IonRouterOutlet id="main">
                                        <Route path="/" exact={true}>
                                            <Redirect to="/solotter-frontend/home"/>
                                        </Route>
                                        <Route path="/solotter-frontend/home" exact={true}>
                                            <Page/>
                                        </Route>
                                        <Route path="/solotter-frontend/mint">
                                            <Mint/>
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
