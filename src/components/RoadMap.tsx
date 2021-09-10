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
          color: 'white'
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
    return ['Genesis Mint', 'First Lottery', 'Lottery Dapp', 'One Time Ticket sales', 'Gaming'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        case 3:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        case 4:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;

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
