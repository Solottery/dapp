import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText} from "@ionic/react";
import {
    Accordion,
    AccordionDetails, AccordionSummary,
    createStyles,
    makeStyles,
    Step,
    StepButton,
    Stepper,
    Theme, Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        acordionBackground: {
            backgroundColor: '#90A4AE'
        }
    }),
);

const FAQ: React.FC = () => {
    const classes = useStyles();
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    FAQ
                </IonCardTitle>
                <IonCardContent>
                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.acordionBackground}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    );
};

export default FAQ;
