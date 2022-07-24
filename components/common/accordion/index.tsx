import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, Box, BoxProps } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

function AccordionCard(
    props: BoxProps & { children?: React.ReactNode; title?: string },
): JSX.Element {
    const { children, title, ...otherProps } = props;

    return (
        <Box {...otherProps}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography fontSize={18}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default AccordionCard;
