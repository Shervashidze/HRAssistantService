import * as React from 'react';
import axios from 'axios';

import '../styles/AddWorker.css';

import {useState, useRef, useCallback, useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { MDBDataTableV5 } from 'mdbreact';
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


export function EditLearningEventPage() {
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const props = useParams()
    const [id, setId] = useState(props.id)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [date, setDate] = useState();
    const [score, setScore] = useState(0);
    const [columns, setColumns] = useState(
      [
          {
            label: 'Имя',
            field: 'name',
            sort: 'asc',
            width: 75
          },
          {
            label: 'Подразделение',
            field: 'department',
            sort: 'asc',
            width: 135
          },
          {
            label: 'Должность',
            field: 'post',
            sort: 'asc',
            width: 135
          },
          {
            label: 'Почта',
            field: 'email',
            sort: 'asc',
            width: 300
          },
          {
            label: '',
            sort: 'disabled',
            field: 'actionAdd'
          },
          {
            label: '',
            sort: 'disabled',
            field: 'actionDelete'
          }
        ])
  
  const [selected, setSelected] = useState([])
  const history = useHistory();
  
  const handleName = (evt) => {
      setName(evt.target.value)
  }
  
  const handleDate = (evt) => {
    setDate(evt.target.value)
  }
  
  const handleDesc = (evt) => {
    setDescription(evt.target.value)
  }
  
  const handleScore = (evt) => {
    setScore(evt.target.value)
  }
  
  
  const updateUploadedFiles = (files) => {
    setSelectedFiles(files)
    console.log(files)
  }
  
  async function sendEvent() {
    const b = JSON.stringify({
      name: name,
      description: description,
      plannedDate: date,
      maxScore: parseInt(score, 10),
      workers: selected
    })
    var ans = await fetch('https://hrassistantservice.herokuapp.com/Learning/CreateLearningEvent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: b
    })
    history.push('/learning')  
  }

  const fetchdata = useCallback(async () => {
    const result = await fetch('https://hrassistantservice.herokuapp.com/api/Workers/All');
    const workers = await result.json();

    const res = await fetch('https://hrassistantservice.herokuapp.com/Learning/GetLearningEvent/' + props.id)
    const cur = await res.json();
    const curw = cur.workers
    let a = workers
    curw.forEach(worker => {if (typeof worker.workerId !== "undefined") 
        worker.id = worker.workerId})
    console.log(a)
    console.log(curw)
    for (var i = 0; i < curw.length; i++) {
        a = a.filter(el => el.id !== curw[i].workerId)
    }
    setCurrent(curw)
    setRows(a)
  }, [])
  
  useEffect(() => {
    fetchdata()
  }, [fetchdata])
  
  function handleDelete(index) {
    let copy = [...selected]
    var ans = copy.splice(index, 1)
    setSelected(copy)
  }
  
  
    return(
        <div>
      <div id="createLP">
          <MDBDataTableV5
              id="WorkersAddTable"
              data = {{columns: columns, rows: selected}}
              striped
              bordered={false}
              btn
              searchTop
              searchBottom={false}
              hover
              entriesOptions={[5, 10, 25]}
              entries={10}
              pagesAmount={4}
              />
          <CustomAdd />
        </div>
        <input type="submit" className="btn btn-primary cbtn" value="Добавить" onClick={() => sendEvent()}/>
        </div>
    );
  
    function CustomAdd() {
      const history = useHistory()
      const [show, setShow] = useState(false);
      const [columns, setColumns] = useState(
          [
              {
                label: 'Имя',
                field: 'name',
                sort: 'asc',
                width: 75
              },
              {
                label: 'Подразделение',
                field: 'department',
                sort: 'asc',
                width: 135
              },
              {
                label: 'Должность',
                field: 'post',
                sort: 'asc',
                width: 135
              },
              {
                label: 'Почта',
                field: 'email',
                sort: 'asc',
                width: 300
              },
              {
                label: '',
                sort: 'disabled',
                field: 'actionAdd'
              },
              {
                label: '',
                sort: 'disabled',
                field: 'actionDelete'
              }
            ])
      
      const [rows, setRows] = useState([])
      
      const [current, setCurrent] = useState(selected);
    
      const handleClose = () => {
          setShow(false)
      }
      const handleShow = () => setShow(true);
    
      const fetchdata = useCallback(async () => {
          const result = await fetch('https://hrassistantservice.herokuapp.com/api/Workers/All');
          const workers = await result.json();
  
          let a = workers
          for (var i = 0; i < current.length; i++) {
              a = a.filter(el => el.id !== current[i].id)
          }
          setRows(a)
      }, [])
        
      useEffect(() => {
          fetchdata()
      }, [fetchdata])
    
      
        function deleteRow(e, index) {
          const copy = [...rows]
          var ans = copy.splice(index, 1)
          setRows(copy)
          setCurrent(element => [...element, {"id": e.id, "name": e.name, "department": e.department, "email": e.email, "post": e.post}])
        }
    
        async function saveChanges() {
          let copy = current
          setSelected(copy)
          handleClose()
        }
    
      return (rows.forEach((e, index) => 
      e["actionDelete"]=<a className="btn btn-light" role="button" 
      onClick={() => deleteRow(e, index)}>Добавить</a>),
        <>
          <Button variant="primary" onClick={handleShow}>
            Добавить работника
          </Button>
    
          <Modal
            show={show}
            size="xl"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Добавить работника</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MDBDataTableV5
              id="WorkersAddTable"
              data = {{columns: columns, rows: rows}}
              autoWidth
              striped
              bordered={false}
              btn
              searchTop
              searchBottom={false}
              hover
              entriesOptions={[5, 10, 25]}
              entries={10}
              pagesAmount={4}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="primary" onClick={saveChanges}>
                  Сохранить изменения
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }