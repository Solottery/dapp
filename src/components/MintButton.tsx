import {IonButton, IonGrid, IonIcon, IonRow, useIonToast} from "@ionic/react";
import {useConnection, useWallet,} from "@solana/wallet-adapter-react";
import {MintLayout, Token} from '@solana/spl-token';
import {Keypair, PublicKey, SystemProgram} from "@solana/web3.js";
import {Provider, web3} from "@project-serum/anchor";
import {useCallback, useState} from "react";
import {ticket} from "ionicons/icons";
import './MintButton.css';
import {
    getCandyMachineAddress,
    getMasterEdition,
    getMetadata,
    getTokenWallet,
    loadAnchorProgram
} from "../helpers/accounts";
import {TOKEN_METADATA_PROGRAM_ID, TOKEN_PROGRAM_ID} from "../helpers/constants";
import {createAssociatedTokenAccountInstruction} from "../helpers/instructions";
import MintedAmount from "./MintedAmount";
import {awaitTransactionSignatureConfirmation} from "../helpers/candy-machine";
import {AttentionSeeker} from "react-awesome-reveal";


const MintButton: React.FC = () => {

    const wallet = useWallet();
    const connection = useConnection();
    const [present] = useIonToast();

    const mintNFT = useCallback(async () => {

        if(!wallet || !wallet.wallet || !wallet.connected){
            await present("Connect wallet first", 500);
            return;
        }

        const mint = Keypair.generate();
        const cacheContent = {"program":{"uuid":"9xxP1r","config":"9xxP1rMa8SFu4SWmasgEi7Ttabex2WKAdDgMDooq1Gui"}};

        const anchorProgram = await loadAnchorProgram(wallet, connection.connection);
        const userTokenAccountAddress = await getTokenWallet(
            wallet.publicKey,
            mint.publicKey,
        );

        const configAddress = new PublicKey(cacheContent.program.config);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [candyMachineAddress, bump] = await getCandyMachineAddress(
            configAddress,
            cacheContent.program.uuid,
        );

        const candyMachine = await anchorProgram.account.candyMachine.fetch(
            candyMachineAddress,
        );

        const metadataAddress = await getMetadata(mint.publicKey);
        const masterEdition = await getMasterEdition(mint.publicKey);

        try {
            const tx = await anchorProgram.rpc.mintNft({
                accounts: {
                    config: configAddress,
                    candyMachine: candyMachineAddress,
                    payer: wallet.publicKey,
                    //@ts-ignore
                    wallet: candyMachine.wallet,
                    mint: mint.publicKey,
                    metadata: metadataAddress,
                    masterEdition,
                    mintAuthority: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                    tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: web3.SYSVAR_RENT_PUBKEY,
                    clock: web3.SYSVAR_CLOCK_PUBKEY,
                },
                signers: [mint],
                instructions: [
                    web3.SystemProgram.createAccount({
                        fromPubkey: wallet.publicKey,
                        newAccountPubkey: mint.publicKey,
                        space: MintLayout.span,
                        lamports:
                            await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(
                                MintLayout.span,
                            ),
                        programId: TOKEN_PROGRAM_ID,
                    }),
                    Token.createInitMintInstruction(
                        TOKEN_PROGRAM_ID,
                        mint.publicKey,
                        0,
                        wallet.publicKey,
                        wallet.publicKey,
                    ),
                    createAssociatedTokenAccountInstruction(
                        userTokenAccountAddress,
                        wallet.publicKey,
                        wallet.publicKey,
                        mint.publicKey,
                    ),
                    Token.createMintToInstruction(
                        TOKEN_PROGRAM_ID,
                        mint.publicKey,
                        userTokenAccountAddress,
                        wallet.publicKey,
                        [],
                        1,
                    ),
                ],
            });
            console.log('Done', tx);

            const result = await awaitTransactionSignatureConfirmation(tx,
                500,
                connection.connection,
                "singleGossip",
                true);

            console.log((result as any).err);

            if (!(result as any).err) {
                await present("Congratulations! Mint succeeded!", 500);
            } else {
                await present("Mint failed! Please try again!", 500);
            }
        }catch (error: any){
            let message = error.msg || "Minting failed! Please try again!";
            if (!error.msg) {
                try {
                    if(error.message){
                        if (error.message.indexOf("0x138")) {
                        } else if (error.message.indexOf("0x137")) {
                            message = `SOLD OUT!`;
                        } else if (error.message.indexOf("0x135")) {
                            message = `Insufficient funds to mint. Please fund your wallet.`;
                        }
                    }
                }catch (e){
                    console.log(e);
                    message = 'There was an unknown error. Check your wallet if minting worked. Else try again';
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }
            await present(message, 500);
        }
    }, [wallet, connection, present]);

    return (
        <IonGrid>
            <IonRow className="center-grid">
                <AttentionSeeker effect={'tada'}>
                    <IonButton onClick={() => mintNFT()} color={'danger'}>
                        <IonIcon slot="start" icon={ticket}/>
                        Mint Now!
                    </IonButton>
                </AttentionSeeker>

            </IonRow>
            <IonRow className="center-grid">
                <MintedAmount/>
            </IonRow>
        </IonGrid>

    );
};

export default MintButton;
