import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material';
import { ErrorBtn, FilledHoverBtn } from '../btns/buttonsStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ModalStyled({ open, setOpen, title, desc, children, action }) {
    const theme = useTheme()

    const handleClose = () => {
        setOpen(false);
    };

    const onAction = async()=> {
        await action()
        setOpen(false)
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: '250px', border: '1px solid rgba(255 255 255, .1)', outline: '1px solid #fff'
                    }
                }}
            >
                {children ? children : (<>
                    <DialogTitle>{title || 'Are you sure ?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {desc}
                        </DialogContentText>
                    </DialogContent>
                </>)}
                <DialogActions>
                    <ErrorBtn sx={{
                        minWidth: '100px',
                        borderRadius: '16px'
                    }} onClick={handleClose}>Disagree</ErrorBtn>
                    {!children && (

                        <FilledHoverBtn sx={{
                            minWidth: '100px'
                        }} onClick={onAction}>Agree</FilledHoverBtn>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}