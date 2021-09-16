import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from '@ionic/react';

import {useLocation} from 'react-router-dom';
import {colorWand, gift, home, rocket} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Home',
        url: '/home',
        iosIcon: home,
        mdIcon: home
    },
    {
        title: 'Mint Tickets',
        url: '/mint',
        iosIcon: colorWand,
        mdIcon: colorWand
    },
    {
        title: 'Rarity',
        url: '/rarity',
        iosIcon: rocket,
        mdIcon: rocket
    },
    {
        title: 'Lottery',
        url: '/lottery',
        iosIcon: gift,
        mdIcon: gift
    },
];

const Menu: React.FC = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="main" type="reveal">
            <IonContent>
                <IonList id="inbox-list" >
                    <IonListHeader>Solottery</IonListHeader>
                    <IonNote> </IonNote>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                                         routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
