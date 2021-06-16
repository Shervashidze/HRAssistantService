import {useState, useRef, useCallback, useEffect} from 'react'
import { MDBDataTableV5 } from 'mdbreact';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useHistory, useParams } from 'react-router';

export function Example() {
    const props = useParams()
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
    
    const [current, setCurrent] = useState([]);
  
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

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

    
      function deleteRow(id, index) {
        const copy = [...rows]
        var ans = copy.splice(index, 1)
        setRows(copy)
        setCurrent(element => [...element, {"id": id}])
      }

      async function saveChanges() {
        const result = await fetch('https://hrassistantservice.herokuapp.com/Learning/GetLearningEvent/' + props.id);
        let event = await result.json();
        console.log(event)
        event.workers = current;
        event.workers.forEach(worker => {if (typeof worker.workerId !== "undefined") 
            worker.id = worker.workerId})
        console.log(event)
        var r = await fetch('https://hrassistantservice.herokuapp.com/Learning/UpdateEvent/' + props.id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(event)
            });
        window.location.href = "https://hrassistantservice.herokuapp.com/editLearningEvent/" + props.id
      }
  
    return (rows.forEach((e, index) => 
    e["actionDelete"]=<a className="btn btn-light" role="button" 
    onClick={() => deleteRow(e.id, index)}>Добавить</a>),
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