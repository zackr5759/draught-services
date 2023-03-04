import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {deepOrange, blue, red} from "@mui/material/colors";

const DraggableComponent =(props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
};

const toInitialUpperCase = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const OneListItem = (props) => {
    const {itemsToDisplay} = props;

     return <List sx={{ width: '100%', maxWidth: 360, minWidth: 360, bgcolor: 'background.paper' }}>
         {
             itemsToDisplay.map(inputItemDict =>
                <ListItem alignItems="flex-start" key={inputItemDict.label}>
                 <ListItemText
                     secondary={
                         <React.Fragment>
                             <Typography
                                 sx={{display: 'inline'}}
                                 component="span"
                                 variant="body2"
                                 color='text.primary'
                             >
                                 {inputItemDict.label + ': '}
                             </Typography>
                             <Box color={ () => inputItemDict.error  ? red[500] : 'text.primary'} display='inline' component='span'>
                             {inputItemDict.error ?
                                 inputItemDict.errorMsg :
                                 inputItemDict.userProvidedValue}
                             </Box>
                         </React.Fragment>
                     }
                 />
             </ListItem>
             )
         }
    </List>
};

const DraggableDialog = (props) => {
    const {itemsToDisplay, handleCancel, handleSaveInformation, handleOkay} = props;

    const numErrors = itemsToDisplay.reduce((accu, item) => accu + (item.error ? 1 : 0), 0);

    const [open, setOpen] = React.useState(true);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        handleOkay();
//        onClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={DraggableComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move', color: numErrors > 0 ? red[500] : blue[900] }} id="draggable-dialog-title">
                    {numErrors > 0 ? `Invalid Input Value${numErrors > 1 ? 's' : ''} (in red)` : 'Please verify the input'}
                </DialogTitle>
                <DialogContent>
                    <OneListItem itemsToDisplay={itemsToDisplay} />
                </DialogContent>
                <DialogActions>
                    { numErrors > 0 ?
                        <Button autoFocus onClick={() => handleOkay()}>Continue Editing</Button>
                        :
                        <React.Fragment>
                            <Button autoFocus onClick={() => handleCancel()}>Cancel</Button>
                            <Box sx={{width: 15, component: 'span'}} />
                            <Button onClick={() => handleSaveInformation()}>Save</Button>
                        </React.Fragment>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DraggableDialog;