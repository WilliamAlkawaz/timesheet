import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';
import { AiFillCloseCircle } from "react-icons/ai";

const Popup = ({openPopup, children, handleClose}) => {
    return (
      <Dialog open={openPopup}>
        <DialogTitle>
            <div style={{display:'flex'}}>
                <div style={{flexGrow:1}}>
                    Add comment
                </div>
                <div>
                    <AiFillCloseCircle style={{cursor:'pointer'}} onClick={handleClose}/>
                </div>
            </div>
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
          <Button variant='warning' size='sm' onClick={handleClose}>Cancel</Button>
          <Button variant='success' size='sm' onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    );
}

export default Popup; 