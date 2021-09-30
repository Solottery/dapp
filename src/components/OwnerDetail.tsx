import {IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonRow, useIonRouter,} from "@ionic/react";

import {useEffect} from "react";
import {OwnerModel} from "../models/owner-model";
import "./OwnerDeatil.css";

export interface OwnerItemProps {
    owner: OwnerModel,
}

const OwnerDetail: (props: OwnerItemProps) => JSX.Element = (props: OwnerItemProps) => {
    return (
        <div>
            <div className={'header-card-owner'}>
                <h1 className={'ion-text-center'}>
                    <a className={'row-item'}
                              href={'https://explorer.solana.com/address/' + props?.owner?.address}>
                    {props?.owner?.address}</a>
                </h1>
                <div id={'rank-box'}>
                    <IonGrid id={'owner-rank-grid'}>
                        <IonRow className={'ion-text-left'}>
                            <IonCol>
                                Rank:
                            </IonCol>
                            <IonCol>
                                {props?.owner?.holder_rank}
                            </IonCol>
                        </IonRow>
                        <IonRow className={'ion-text-left'}>
                            <IonCol>
                                Weight Rank:
                            </IonCol>
                            <IonCol>
                                {props?.owner?.weight_rank}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

            </div>

            <IonGrid>
                <IonRow className={'ticket-list-container'}>
                    {props?.owner?.ticket_list.map((row, index) =>
                        <IonCard key={index} className={'ticket-card'}>
                            <IonCardHeader class={'ion-text-center'}>
                                <IonCardTitle>{row.name}</IonCardTitle>
                            </IonCardHeader>
                            <IonImg className={'ticket-detail-view'} src={row.img}/>
                        </IonCard>
                    )}
                </IonRow>
            </IonGrid>
        </div>
    );
};

export default OwnerDetail;
