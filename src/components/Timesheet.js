import React, { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Data from './Data';
import { BsFillChatLeftFill, BsFillChatLeftTextFill } from 'react-icons/bs';
import { MdDelete } from "react-icons/md";
import Popup from './Popup';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';

const Timesheet = () => {
    const [count, setCount] = useState(0);
    // This represents a row of selected item in a certain record in the timesheet. Days comment in an array of 5 days
    // We have to initialise daysComment this way to avoid "Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component."
    // This can be moved to useEffect once we design the api
    const selection = {selProject : -1, selTask: -1, selWorkType: -1, daysHours: new Array(5), daysComment: ['', '', '', '', '']}; 
    // This represents the text displayed in a combobox in a record in the timesheets
    const selTitle= {selProjectTitle: 'Select a project', selTaskTitle: 'Select a task', selWorkTypeTitle: 'Select a title'};
    const [selData, setSelData] = useState([selection]);
    const [selTitles, setSelTitles] = useState([selTitle]);
    const [daysTotal, setDaysTotal] = useState([0, 0, 0, 0, 0]); 
    const [popUpComment, setPopUpComment] = useState(''); 
    const [openPopup, setOpenPopup] = useState(false); 
    const [rowForPopUp, setRowForPopUp] = useState(0); 
    const [popUpTitle, setPopUpTitle] = useState(''); 
    const [popUpDayId, setPopUpDayId] = useState(0); 

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; 

    const decrement = (rowId) => {
        const selDataClone = [...selData]; // copying the old data array
        const selTitlesClone = [...selTitles]; // copying the old data array
        // First update the total hours 
        let newDaysTotal = [...daysTotal]; // copying the old data array
        days.forEach((x, y) => {
            if(!isNaN(selDataClone[rowId].daysHours[y]))
                newDaysTotal[y] = newDaysTotal[y] - selDataClone[rowId].daysHours[y]; // update the current day total hours 
        })
        setDaysTotal(newDaysTotal);
        // Second remove the row 
        selDataClone.splice(rowId, 1); 
        selTitlesClone.splice(rowId, 1); 
        setSelData(selDataClone);
        setSelTitles(selTitlesClone);
        setCount(count - 1);
    }

    const handleSel = (rowId, id) => {
        const tempId = selData[rowId].selProject; 
        const selDataClone = [...selData]; 
        const selTitlesClone = [...selTitles]; 
        selDataClone[rowId].selProject = id; 
        selTitlesClone[rowId].selProjectTitle = Data.projects.find(x => x.id.toString() === id).name; 
        selTitlesClone[rowId].selTaskTitle = 'Select a task';
        if(tempId === -1)
        {
            selDataClone.push({selProject : -1, selTask: -1, selWorkType: -1, daysHours: new Array(5), daysComment: ['', '', '', '', '']});
            selTitlesClone.push({selProjectTitle: 'Select a project', selTaskTitle: 'Select a task', selWorkTypeTitle: 'Select a title'}); 
            setCount(count + 1); 
        }
        setSelData(selDataClone);
        setSelTitles(selTitlesClone);
    }
    
    const handleTaskSel = (rowId, id) => {
        console.log('id is ' + id + ' rowId is ' + rowId + ' count ' + count);
        console.log(selData[rowId].selTask.toString());
        const projectId = selData[rowId].selProject; 
        const selDataClone = [...selData]; 
        const selTitlesClone = [...selTitles]; 
        selDataClone[rowId].selTask = id; 
        selTitlesClone[rowId].selTaskTitle = Data.projects[projectId].tasks.find(x => x.id.toString() === id).name; 
        setSelData(selDataClone);
        setSelTitles(selTitlesClone);
    }

    const handleWorkTypeSel = (rowId, id) => {
        console.log('id is ' + id + ' rowId is ' + rowId + ' count ' + count);
        const selDataClone = [...selData]; 
        const selTitlesClone = [...selTitles]; 
        selDataClone[rowId].selWorkType = id; 
        selTitlesClone[rowId].selWorkTypeTitle = Data.workType.find(x => x.id.toString() === id).name; 
        setSelData(selDataClone);
        setSelTitles(selTitlesClone);
    }

    const handleComment = (rowId, dayId) => {
        console.log('let\'s print Monday comment, rowId is ' + JSON.stringify(rowId)); 
        console.log(selData[rowId].selProject.toString());
        const tempComment = selData[rowId].daysComment[dayId]; 
        setPopUpComment(tempComment); 
        setRowForPopUp(rowId); 
        setPopUpTitle(days[dayId]); 
        setPopUpDayId(dayId); 
        setOpenPopup(true); 
    }

    const handlePopUpClose = (save, rowId) => {
        if(save)
        {
            const selDataClone = [...selData]; 
            selDataClone[rowId].daysComment[popUpDayId] = popUpComment; 
            setSelData(selDataClone);
        }
        setOpenPopup(false);
    }

    const handleHoursChanged = (e, rowId, dayId) => {
        // Update the record hours 
        const selDataClone = [...selData]; // copying the old data array
        // const temp = isNaN(selDataClone[rowId].daysHours[dayId]) ? 0 : selDataClone[rowId].daysHours[dayId] // We need this when updating the total, make sure we deal with numbers
        selDataClone[rowId].daysHours[dayId] = e.target.value; 
        setSelData(selDataClone);
        // Update the totals 
        let newArr = [...daysTotal]; // copying the old data array
        let sum = 0; 
        for (var j = 0; j<count+1; j++)
        {
            if(!isNaN(parseFloat(selDataClone[j].daysHours[dayId])))
                sum += parseFloat(selDataClone[j].daysHours[dayId]); 
        }
        newArr[dayId] = sum; // update the current day total hours 
        setDaysTotal(newArr);
    }

    useEffect(() => {
        console.log('from useEffect ' + selData[0]);
    }, [selData])

    return (
        <div>
            <Container className='p-3' style={{width:'90em'}}>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col ></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col><Button variant='warning' size='sm'>Save and submit</Button></Col>
                    <Col><Button variant='success' size='sm'>Save</Button></Col>
                </Row>
            </Container>
            <div className='block-example border border-dark' style={{width:'90em',paddingRight:2,paddingLeft:2,overflow:'auto'}}>
                <Row className='block-example border border-dark  p-2'>
                    <Col sm={2}>
                        Project
                    </Col>
                    <Col sm={2}>
                        Task
                    </Col>
                    <Col sm={2}>
                        Work type
                    </Col>
                    {
                        days.map((x, y) => {
                            return <Col key={y}>{x}</Col>
                        })
                    }
                </Row>
                {Array.from(Array(count+1), (e, i) => {
                    return <Row className='p-1' key={i}>
                    <Col sm={2}>
                        <div style={{display:'flex'}}>
                            <div style={{marginRight:1}}>
                                {selData[i].selProject > -1 ? <Button key={i} onClick={(e) => decrement(i)} variant="danger" size='sm'><MdDelete/></Button> : ''}
                            </div>
                            <div>
                                <CustomDropdown 
                                    key={i} 
                                    id={i}
                                    arr={Data.projects} 
                                    title={selData[i].selProject > -1 ? selTitles[i].selProjectTitle : 'Select a project'}
                                    handleSel={handleSel}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <CustomDropdown 
                            key={i} 
                            id={i}
                            arr={selData[i].selProject > -1 ? Data.projects[selData[i].selProject].tasks : []} 
                            title={selData[i].selProject > -1 ? selTitles[i].selTaskTitle : 'Select a task'}
                            handleSel={handleTaskSel}
                        />
                    </Col>
                    <Col sm={2}>
                        <CustomDropdown 
                            key={i} 
                            id={i}
                            arr={Data.workType} 
                            title={selData[i].selProject > -1 ? selTitles[i].selWorkTypeTitle : 'Select a work type'}
                            handleSel={handleWorkTypeSel}
                        />
                    </Col>
                    {
                        days.map((x, y) => {
                        return (<Col key={y} style={{backgroundColor:'lightgray', marginRight:1, marginLeft:1}}>
                            <div style={{display:'flex'}}>
                                <div style={{width:'70%', marginRight:10}}>
                                    <FormControl className='text-center' value={selData[i].daysHours[y]? selData[i].daysHours[y] : ''} onChange={(e) => handleHoursChanged(e, i, y)} size='sm'/>
                                </div>
                                <div style={{width:'20%'}}>
                                    {
                                        selData[i].daysComment[y] === '' 
                                        ? 
                                            <BsFillChatLeftFill style={{cursor:'pointer'}} onClick={(e) => handleComment(i, y)} />  
                                        :
                                            <Tooltip title={selData[i].daysComment[y]} placement='top'>
                                                <div>
                                                    <BsFillChatLeftTextFill style={{cursor:'pointer'}} onClick={(e) => handleComment(i, y)} />
                                                </div>
                                            </Tooltip>
                                    }
                                </div>
                            </div>
                        </Col>
                        )})
                    }
                </Row>
                })}
                <Row className='block-example border border-dark p-2'>
                    <Col sm={2}>
                    <div className="row">
                        <div className="col-2">
                            Total
                        </div>
                        <div className="col-3">
                        </div>
                    </div>
                    </Col>
                    <Col sm={2}>
                    </Col>
                    <Col sm={2}>
                    </Col>
                    {
                        days.map((x, y) => {
                            return <Col className='text-center' key={y}>{daysTotal[y].toString()}</Col>
                        })
                    }
                </Row>
            </div>
            <Popup
                openPopup={openPopup}
                handleClose={handlePopUpClose}
                row={rowForPopUp}
                title={popUpTitle}
            >
                <div>Customer Notes</div>
                
                    <FormGroup>
                        <InputGroup>
                        <textarea value={popUpComment} onChange={(e) => setPopUpComment(e.target.value)}/>
                        </InputGroup>
                    </FormGroup>
                
            </Popup>
        </div>
    );
}; 

export default Timesheet; 
