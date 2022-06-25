import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';

const Popup = ({openPopup, children, handleClose, row, title}) => {
    return (
      <Dialog open={openPopup}>
        <DialogTitle>
            <div style={{display:'flex', backgroundColor:'lightgray', padding:1}}>
                <div style={{flexGrow:1}}>
                    <h6>Additional information for</h6> 
                    <p>{title}</p>
                </div>
                <div>
                    <AiFillCloseCircle style={{cursor:'pointer'}} onClick={(e) => handleClose(false, row)}/>
                </div>
            </div>
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
          <Button variant='warning' size='sm' onClick={(e) => handleClose(false, row)}>Cancel</Button>
          <Button variant='success' size='sm' onClick={(e) => handleClose(true, row)}>Save</Button>
        </DialogActions>
      </Dialog>
    );
}

export default Popup; 