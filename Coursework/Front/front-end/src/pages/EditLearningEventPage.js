import * as React from 'react';

import '../styles/AddWorker.css';

import {useState, useRef, useCallback, useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { MDBDataTableV5 } from 'mdbreact';

import {fetchLearningEvent, fetchWorkerInfo} from '../services/fetch-service'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { downloadTableWithoutLast1 } from '../services/file-service';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import DatePicker from "react-datepicker";


export function EditLearningEventPage() {
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
            field: 'initialScore',
            sort: 'asc',
            width: 135
          },
          {
            label: 'Оценка после обучения',
            field: 'afterwardsScore',
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
      element["actionFeedback"] = <CreateFeedBackView workerId={element.id} />})
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

  useEffect(() => {
      var table = document.getElementById("EditLETable")
      console.log(table)
      rows.forEach(row => {
          var iscore = row.initialScore
          row["initialScore"] = <input style={{textAlign: "center"}} type="text" value={iscore} onChange={e => row.initialscore = e.target.value} ></input>
      })
      rows.forEach(row => {
        var iscore = row.afterwardsScore
        row["afterwardsScore"] = <input style={{textAlign: "center"}} type="text" value={iscore} onChange={e => row.afterwardsscore = e.target.value} ></input>
    })
  }, [rows])

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

const sendEvent = async () => {
  let r = []
  rows.forEach(e => {
    r.push(({
      name: e.name,
      department: e.department, 
      initialScore: e.initialscore,
      afterwardsScore: e.afterwardsscore, 
      workerId: e.workerId,
      learningEventId: props.id
    }))
  });

  const b = JSON.stringify({
    name: name,
    description: description,
    plannedDate: date,
    maxScore: parseInt(score, 10),
    workers: r
  })

  console.log(b)

  // https://hrassistantservice.herokuapp.com/Learning/CreateLearningEvent
  var ans = await fetch('https://localhost:8001/Learning/UpdateEvent/' + props.id, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: b
  })

  console.log(ans)

  // var ans = await createLP(b);

  // var fetched = await ans.json();

  // const formData = new FormData();
  // formData.name = "files";
  // for (const f of selectedFiles) {
  //   formData.append("files", f);
  // }


  // await fetch('https://localhost:8001/Learning/UploadFile/' + fetched, {
  //     method: 'POST',
  //     body: formData
  //   })
  
  history.push('/learning/' + props.id)
}

    return(addFeedback(),
      <div>
        <Navbar bg="light" variant="light" expand="lg">
          <Nav variant="tabs" className="container-fluid" activeKey={window.location.pathname}>
            <Nav.Item>
              <Nav.Link href={"/learning/" + id} eventKey="/workers">Назад</Nav.Link>
            </Nav.Item>
          </Nav>
      </Navbar>
      <div style={{margin: '10px 0 0 0'}} />
      <input type="text" id="name1" className="form-control cform-control" value={name} onChange={(e) => handleName(e)} placeholder="Название"/>
      <input type="text" id="decr1" className="form-control cform-control" value={description} onChange={(e) => handleDesc(e)} placeholder="Описание"/>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px'}}>
          <div>
            <label>Максимально возможная оценка:</label>
            <input style={{textAlign: "center"}} type="text" className="form-control" value={score} onChange={(e) => handleScore(e)} placeholder="Максимальный балл"/>
          </div>
          <div>
            <DatePicker className="datepick" dateFormat="dd.MM.yyyy" selected={typeof date === "undefined" ? new Date() : new Date(date.substring(0, 4), date.substring(5,7), date.substring(8,10))}  onChange={(date) => setDate(date)} placeholderText="Дата проведения" />
          </div>      
          </div>
      <div id="createLP">
        <MDBDataTableV5
            id="EditLETable"
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
        <input style={{width: "97%", border: "5%"}} type="submit" className="btn btn-primary" value="Сохранить изменения" onClick={() => sendEvent()}/>
        </div>
    )
}

const CreateFeedBackView = (props) => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [post, setPost] = useState("")
  const [department, setDepartment] = useState("")
  const [actualCheckbox, setActualCheckbox] = useState(0)
  const [actualCommentary, setActualCommentary] = useState("")
  const [scoreBox, setScoreBox] = useState(0)
  const [scoreCommentary, setScoreCommentary] = useState("")
  const [useability, setUseability] = useState(0)
  const [difficulties, setDifficulties] = useState("")
  const [newLearnings, setNewLearnings] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const handleShow = () => setShow(true)
  const handleClose = () => {
    setShow(false)
}

useEffect(() => {
  fetchWorkerInfo(props.workerId).then((res) => {
    setName(res.name)
    setPost(res.post)
    setDepartment(res.department)
    setActualCheckbox(1)
    setScoreBox(2)
    setScoreCommentary("срочно надо")
    setUseability(3)
  });
}, [])

  return(
    <>
    <Button className="btn btn-light" variant="primary" onClick={handleShow}>
        Редактировать обратную связь
    </Button>
      <Modal
            show={show}
            size="xl"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{textAlign: "center"}}> Анкета обратной связи с работником, прошедшим обучение  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <pre style={{fontSize: "13pt"}}>
                <div>Ф.И:           {name}</div>
                <div>Должность:     {post}</div>
                <div>Подразделение: {department}</div>
                <div> </div>
                <ol>
                <li>На Ваш взгляд являлась ли программа актуальной для Вас с учётом имеющегося опыта работы?   </li>
                <div>
                  <input type="checkbox" id="actualCheckbox1" value="coding" checked={actualCheckbox === 1 ? true : false} disabled/>
                  <label for="actualCheckbox1"> Очень актуально, важно идти с опережением вперёд</label>
                </div>
                <div>
                  <input type="checkbox" id="actualCheckbox2" value="coding" checked={actualCheckbox === 2 ? true : false} disabled/>
                  <label for="actualCheckbox2"> Актуально</label>
                </div>
                <div>
                  <input type="checkbox" id="actualCheckbox3" value="coding" checked={actualCheckbox === 3 ? true : false} disabled/>
                  <label for="actualCheckbox3"> Не могу сказать</label>
                </div>
                <div>
                  <input type="checkbox" id="actualCheckbox1" value="coding" checked={actualCheckbox === 4 ? true : false} disabled/>
                  <label for="actualCheckbox1"> Есть более актуальные темы для обучения (напишите какие именно) </label>
                </div>
                <div>Комментарий: {actualCommentary !== "" ? actualCommentary : "-"}</div>
                <div> </div>
                <li>Отметьте, пожалуйста, как Вы оцениваете содержание учебных курсов</li> 
                <div>(интересно, полезно, качество представленного материала, изложение материала и т.д.): </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <div>
                    <input type="checkbox" id="scoreCheckbox1" value="coding" checked={scoreBox === 1 ? true : false} disabled/>
                    <label for="scoreCheckbox1"> отлично </label>
                  </div>
                  <div>
                    <input type="checkbox" id="scoreCheckbox2" value="coding" checked={scoreBox === 2 ? true : false} disabled/>
                    <label for="scoreCheckbox2"> очень хорошо </label>
                  </div>
                  <div>
                    <input type="checkbox" id="scoreCheckbox3" value="coding" checked={scoreBox === 3 ? true : false} disabled/>
                    <label for="scoreCheckbox3"> хорошо </label>
                  </div>
                  <div>
                    <input type="checkbox" id="scoreCheckbox4" value="coding" checked={scoreBox === 4 ? true : false} disabled/>
                    <label for="scoreCheckbox4"> удовлетворительно </label>
                  </div>
                  <div>
                    <input type="checkbox" id="scoreCheckbox5" value="coding" checked={scoreBox === 5 ? true : false} disabled/>
                    <label for="scoreCheckbox5"> слабо </label>
                  </div>
                </div>
                <div>Комментарий: {scoreCommentary !== "" ? scoreCommentary : "-"}</div>
                <div> </div>
                <li>Считаете ли Вы, что полученные знания и новые навыки сможете применить в своей повседневной работе?</li> 
                <div>
                  <div>
                    <input type="checkbox" id="usability1" value="coding" checked={useability === 1 ? true : false} disabled/>
                    <label for="usability1"> смогу использовать в высокой степени </label>
                  </div>
                  <div>
                    <input type="checkbox" id="usability2" value="coding" checked={useability === 2 ? true : false} disabled/>
                    <label for="usability2"> смогу использовать в некоторой степени </label>
                  </div>
                  <div>
                    <input type="checkbox" id="usability3" value="coding" checked={useability === 3 ? true : false} disabled/>
                    <label for="usability3"> полученный материал слабо применим в моей работе </label>
                  </div>
                  <div>
                    <input type="checkbox" id="usability4" value="coding" checked={useability === 4 ? true : false} disabled/>
                    <label for="usability4"> полученный материал неприменим в моей работе  </label>
                  </div>
                </div>
                <div> </div>
                <li>Какие трудности Вы испытывали (личностного, организационного и т.п. характера), участвуя в обучении. </li> 
                <div>Что Вам не понравилось?</div>
                <div>Комментарий: {difficulties !== "" ? difficulties : "-"}</div>
                <div> </div>
                <li>Какие дополнительные знания и навыки с помощью тренингового обучение Вы бы хотели получить в дальнейшем?</li> 
                <div>Комментарий: {newLearnings !== "" ? newLearnings : "-"}</div>  
                <div> </div>
                <li>Ваши замечания и предложения по проведению образовательных мероприятий в рамках данного проекта:</li>
                <div>Комментарий: {suggestions !== "" ? suggestion : "-"}</div>
                </ol>
              </pre>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="primary">
                  Скачать в docx
              </Button>
            </Modal.Footer>
    </Modal>
  </>
  )
}