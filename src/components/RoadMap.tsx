import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText} from "@ionic/react";
import {useState} from "react";
import {createStyles, makeStyles, Step, StepButton, Stepper, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        transparent: {
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        stepItem: {
            color: 'var(--ion-text-color)'
        },
        button: {
            marginRight: theme.spacing(1),
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

function getSteps() {
    return ['The presale', 'The first jackpot', 'The Main sale', 'The Ticket market', 'The fee lottery', 'The expanding'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'We open our presale with 200 Tickets to mint. Mint your ticket for the first NFT lottery. Our infrastructure builds on the candy machine – fair distribution guaranteed.';
        case 1:
            return 'Are the odds with you? The first drawing will reveal it. Don’t waste the chance to win your own fortune! As soon as the presale is over, the first winner in the history of Solana NFT lotterys will get his wallet filled with sweet, sweet jackpot cash.\n';
        case 2:
            return 'The main sale with the other 9’800 tickets will open after the presale winner is announced.';
        case 3:
            return 'Trade the tickets on the main SOL NFT marketplace.';
        case 4:
            return 'Release of our additional one-way tickets. The first row will be an airdrop to the owner addresses of the genesis NFTs. The Pot will be filled with fees from marketplace trading. ';
        case 5:
            return 'Release one-way tickets on a regular basis to generate more pots for more winners.';
        default:
            return 'Unknown step';
    }
}


const RoadMap: React.FC = () => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set<number>());
    const [skipped, setSkipped] = useState(new Set<number>());
    const steps = getSteps();


    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    function isStepComplete(step: number) {
        return completed.has(step);
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Roadmap
                </IonCardTitle>
                <IonCardContent>
                    <Stepper alternativeLabel nonLinear activeStep={activeStep} className={classes.transparent}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const buttonProps: { optional?: React.ReactNode } = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps} className={classes.stepItem}>
                                    <StepButton
                                        className={classes.stepItem}
                                        onClick={handleStep(index)}
                                        completed={isStepComplete(index)}
                                        {...buttonProps}
                                    >
                                        <IonText className={classes.stepItem}>{label}</IonText>
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <IonText>{getStepContent(activeStep)}</IonText>
                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default RoadMap;
