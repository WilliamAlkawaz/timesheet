import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tooltip from '@mui/material/Tooltip';

const CustomDropdown = ({id, arr, handleSel, selId, title, width}) => {
  const createOptions = (arr) =>
  {
    var a = new Array(arr.length);
    arr.forEach((e, i) => {
      let el = {value: e.id, label: e.name}
      a.push(el); 
    });
    return a; 
  }

  return (
    <div>
      <Tooltip title={title} placement='top'>
        <div>
          <select 
            id={id}
            value={selId}
            onChange={(e) => handleSel(id, e.target.value)}
            style={{width: width}}
          >
            {
              arr.map((e, i) => {
                return <option key={e.id} value={e.id}>{e.name}</option>
              })
            }
          </select>
        </div>
      </Tooltip>
    </div>
  );
}; 

export default CustomDropdown; 
