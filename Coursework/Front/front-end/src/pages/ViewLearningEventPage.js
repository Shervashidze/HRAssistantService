import * as React from 'react';

import '../styles/AddWorker.css';

import {useState, useRef, useCallback, useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { MDBDataTableV5 } from 'mdbreact';

import {fetchLearningEvent, fetchWorkerInfo} from '../services/fetch-service'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


export function ViewLearningEventPage() {
    const props = useParams()
    const [id, setId] = useState(props.id)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState();
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState(
      [
          {
            label: 'Имя',
            field: "name",
            sort: 'asc',
            width: 75
          },
          {
            label: 'Производство',
            field: 'department',
            sort: 'asc',
            width: 135
          },
          {
            label: 'Оценка до обучения',
            field: 'post',
            sort: 'asc',
            width: 135
          },
          {
            label: 'Оценка после обучения',
            field: 'email',
            sort: 'asc',
            width: 300
          },
          {
            label: '',
            sort: 'disabled',
            field: 'actionFeedback'
          }
        ])
  const history = useHistory();

  const handleWorkerInfo = async (workers) => {
    var newWorkers = []
    for (let i of workers) {
      const worker = await fetchWorkerInfo(i.workerId);
      newWorkers.push({name: worker.name, department: worker.department, initialScore: i.initialScore, afterwardsScore: i.afterwardsScore, id: i.workerId});
    }

    return newWorkers
  }

  const addFeedback = () => {
    var copy = rows;
    rows.forEach(element => {
      element["actionFeedback"] = <CreateFeedBackView workerId={element.id}/>})
  }

  const handleFetchEvent = async () => {
    fetchLearningEvent(id).then((event) => {
      setName(event.name)
      setDate(event.plannedDate)
      setDescription(event.description)
      setScore(event.maxScore)
      
      handleWorkerInfo(event.workers).then((res) => setRows(res))
    })
  }

  useEffect(() => {
    handleFetchEvent()
  }, [])
  
    return(addFeedback(),
      <div>
      <div style={{margin: '10px 0 0 0'}} />
      <h1 style={{textAlign: 'center'}}>{name}</h1>
      <h3 style={{textAlign: 'center'}}>{description}</h3>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px'}}>
        <h4 style={{}}>Максимально возможная оценка: {score}</h4>
        <h4 style={{}}>Дата проведения: {date}</h4>
      </div>
      <div id="createLP">
        <MDBDataTableV5
            id="WorkersAddTable"
            data = {{columns: columns, rows: rows}}
            striped
            order={['name', 'asc']}
            bordered={false}
            btn
            searchTop
            searchBottom={false}
            hover
            entriesOptions={[5, 10, 25]}
            entries={10}
            pagesAmount={4}
            />
        </div>
      </div>
    )
}

const CreateFeedBackView = (props) => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => {
    setShow(false)
}

  return(
    <>
    <Button className="btn btn-light" variant="primary" onClick={handleShow}>
        Обратная связь
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
              <div>Show me {props.workerId}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="primary">
                  Сохранить изменения
              </Button>
            </Modal.Footer>
  </Modal>
  </>
  )
}