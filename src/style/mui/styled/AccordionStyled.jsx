import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionStyled({ title, children, color = 'primary.main', bgcolor = 'background.default', expanded = false, setExpanded }) {

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    }

    return (
        <Accordion
            expanded={expanded}
            onChange={handleExpansion}

            slotProps={{ transition: { unmountOnExit: true } }} sx={{
                border: 'none', m: '20px 0',
                borderRadius: '16px',
                '&::before': {
                    display: 'none'
                }
            }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                    bgcolor: color, color: 'grey.0',
                    borderRadius: '16px',
                }}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails sx={{
                bgcolor: bgcolor,
                borderRadius: '16px'
            }}>
                {children}
            </AccordionDetails>

            {/* <AccordionActions>
                <Button>Cancel</Button>
                <Button>Agree</Button>
            </AccordionActions> */}
        </Accordion>
    );
}