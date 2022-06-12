import React, { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Data from './Data';
import { BsFillChatLeftFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Popup from './Popup';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

const Timesheet = () => {
    const [arr, setArr] = useState(Data); 
    const [count, setCount] = useState(0);
    const selection = {selProject : -1, selTask: -1, selWorkType: -1}; 
    const selTitle= {selProjectTitle: 'Select a project', selTaskTitle: 'Select a task', selWorkTypeTitle: 'Select a title'};
    const [selData, setSelData] = useState([selection]);
    const [selTitles, setSelTitles] = useState([selTitle]);
    const [tasksArray, setTasksArray] = useState([]);
    const [mon, setMon] = useState(0); 
    const [tue, setTue] = useState(0); 
    const [wed, setWed] = useState(0); 
    const [thu, setThu] = useState(0); 
    const [fri, setFri] = useState(0); 
    const [openPopup, setOpenPopup] = useState(false); 

    const increment = () => {
        //setSelData(selData.push(selection)); 
        //setSelTitles(selTitles.push(selTitle));
        //setCount(count + 1); 
    }
    const decrement = (rowId) => {
        const selDataClone = [... selData]; 
        const selTitlesClone = [... selTitles]; 
        selDataClone.splice(rowId, 1); 
        selTitlesClone.splice(rowId, 1); 
        setSelData(selDataClone);
        setSelTitles(selTitlesClone);
        setCount(count - 1);
    }
    const handleSel = (rowId, id) => {
        console.log('id is ' + id + ' rowId is ' + rowId + ' count ' + count);
        console.log(selData[rowId].selProject.toString());
        const tempId = selData[rowId].selProject; 
        const selDataClone = [... selData]; 
        const selTitlesClone = [... selTitles]; 
        //var tasksArrayClone = []
        //tasksArrayClone[rowId] = Data.tasks[id]; 
        selDataClone[rowId].selProject = id; 
        selTitlesClone[rowId].selProjectTitle = Data.projects.find(x => x.id.toString() === id).name; 
        if(tempId === -1)
        {
            selDataClone.push({selProject : -1, selTask: -1, selWorkType: -1});
            selTitlesClone.push({selProjectTitle: 'Select a project', selTaskTitle: 'Select a task', selWorkTypeTitle: 'Select a title'}); 
            //tasksArrayClone.push([]);
            setCount(count + 1); 
        }
        setSelData(selDataClone);
        setSelTitles(selTitlesClone);
        //setTasksArray(tasksArrayClone); 
    }

    const monChanged = (event) => {
        setMon(mon+parseInt(event.target.value)); 
    }
    const tueChanged = (event) => {
        setTue(tue+parseInt(event.target.value)); 
    }
    const wedChanged = (event) => {
        setWed(wed+parseInt(event.target.value)); 
    }
    const thuChanged = (event) => {
        setThu(thu+parseInt(event.target.value)); 
    }
    const friChanged = (event) => {
        setFri(fri+parseInt(event.target.value)); 
    }

    const handleClose = () => {
        setOpenPopup(false);
    }

    useEffect(() => {
        console.log(selData[0]);
    }, [selData, selTitles])

    return (
        <div>
            <Container className='p-3'>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col ></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col><Button variant="warning" size='sm'>Save and submit</Button></Col>
                    <Col><Button variant="success" size='sm'>Save</Button></Col>
                </Row>
            </Container>
            <Container className="block-example border border-dark">
                <Row className="block-example border border-dark  p-2">
                    <Col sm={1}>
                    </Col>
                    <Col sm={2}>
                        Project
                    </Col>
                    <Col sm={2}>
                        Task
                    </Col>
                    <Col sm={2}>
                        Work type
                    </Col>
                    <Col sm={1}>
                        Monday
                    </Col>
                    <Col sm={1}>
                        Tuesday
                    </Col>
                    <Col sm={1}>
                        Wednesday
                    </Col>
                    <Col sm={1}>
                        Thursday
                    </Col>
                    <Col sm={1}>
                        Friday
                    </Col>
                </Row>
                {Array.from(Array(count+1), (e, i) => {
                    return <Row className='p-1' key={i}>
                    <Col sm={3}>
                    <div className="row">
                        <div className="col-2">
                            {selData[i].selProject > -1 ? <Button key={i} onClick={(i) => decrement(i)} variant="danger" size='sm'><MdDelete/></Button> : ''}
                        </div>
                        <div className="col-3">
                            <CustomDropdown 
                                key={i} 
                                id={i}
                                arr={arr.projects} 
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
                            title='Select a task'
                            //handleSel={handleSel}
                        />
                    </Col>
                    <Col sm={2}>
                        <CustomDropdown 
                            key={i} 
                            id={i}
                            arr={arr.workType} 
                            title='Select a work type'
                            //handleSel={handleSel}
                        />
                    </Col>
                    <Col sm={1}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Control onChange={monChanged} size='sm'/>
                            </div>
                            <div className="col-3">
                                <BsFillChatLeftFill style={{cursor:'pointer'}} onClick={() => setOpenPopup(true)}/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={1}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Control onChange={tueChanged} size='sm'/>
                            </div>
                            <div className="col-3">
                                <BsFillChatLeftFill/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={1}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Control onChange={wedChanged} size='sm'/>
                            </div>
                            <div className="col-3">
                                <BsFillChatLeftFill/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={1}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Control onChange={thuChanged} size='sm'/>
                            </div>
                            <div className="col-3">
                                <BsFillChatLeftFill/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={1}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Control onChange={friChanged} size='sm'/>
                            </div>
                            <div className="col-3">
                                <BsFillChatLeftFill/>
                            </div>
                        </div>
                    </Col>
                </Row>
                })}
                <Row className='block-example border border-dark p-2'>
                    <Col sm={3}>
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
                    <Col sm={1}>
                        {mon}
                    </Col>
                    <Col sm={1}>
                        {tue}
                    </Col>
                    <Col sm={1}>
                        {wed}
                    </Col>
                    <Col sm={1}>
                        {thu}
                    </Col>
                    <Col sm={1}>
                        {fri}
                    </Col>
                </Row>
            </Container>
            <Popup
                openPopup={openPopup}
                handleClose={handleClose}
            >
                <div>Label</div>
                <Form>
                    <FormGroup>
                        <InputGroup>
                        <FormControl readOnly={true} value='default'/>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </Popup>
        </div>
    );
}; 

export default Timesheet; 
