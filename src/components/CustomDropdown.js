import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomDropdown = ({id, arr, handleSel, title}) => {

  return (
    <div>
      <DropdownButton id="dropdown-basic-button"
        variant="info"
        className="floatRight"
        onSelect={(event, e) => handleSel(id, e.target.value)}
        title={title}
        size='sm'
      >
      {
        true ? 
          arr.map((x, i) => {
            return (
            <Dropdown.Item as='option' key={x.id} eventKey={x.name} value={x.id}>
              {x.name}
            </Dropdown.Item>
            );
          })
        : ''
      }
      </DropdownButton>
    </div>
  );
}; 

export default CustomDropdown; 
