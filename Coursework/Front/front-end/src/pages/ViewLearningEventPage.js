import * as React from 'react';

import '../styles/AddWorker.css';

import {useState, useRef, useCallback, useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { MDBDataTableV5 } from 'mdbreact';

import {fetchLearningEvent, fetchWorkerInfo, getFeedbaack} from '../services/fetch-service'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { downloadTableWithoutLast1 } from '../services/file-service';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


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
      console.log(i)
      newWorkers.push({name: worker.name, department: worker.department, initialScore: i.initialScore, afterwardsScore: i.afterwardsScore, id: i.workerId});
    }

    return newWorkers
  }

  const addFeedback = () => {
    var copy = rows;
    rows.forEach(element => {
      element["actionFeedback"] = <CreateFeedBackView id={props.id} workerId={element.id} />})
  }

  const handleFetchEvent = async () => {
    fetchLearningEvent(id).then((event) => {
      setName(event.name)
      setDate(event.plannedDate.substring(0, 10))
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
        <Navbar bg="light" variant="light" expand="lg">
          <Nav variant="tabs" className="container-fluid" activeKey={window.location.pathname}>
            <Nav.Item>
              <Nav.Link href="/learning" eventKey="/workers">Назад</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={"/editLearningEvent/" + id} eventKey="/learning">Изменить</Nav.Link>
            </Nav.Item>
          </Nav>
      </Navbar>
      <div style={{margin: '10px 0 0 0'}} />
      <h1 style={{textAlign: 'center'}}>{name}</h1>
      <h3 style={{textAlign: 'center'}}>{description}</h3>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px'}}>
        <h4 style={{}}>Максимально возможная оценка: {score}</h4>
        <h4 style={{}}>Дата проведения: {date}</h4>
      </div>
      <div id="createLP">
        <MDBDataTableV5
            id="WorkersViewTable"
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
        <a className="btn btn-primary" onClick={() => downloadTableWithoutLast1('WorkersViewTable','1',name + " " + date)} role="button">Загрузить в виде Excel</a>
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
    fetchFeedback()
  });
}, [])

const fetchFeedback = (async () => {
  const ans = await getFeedbaack(props.id, props.workerId);
  console.log(props.id)
  console.log(props.workerId)
  const a = await ans.json()
  setActualCheckbox(a.actuallity)
  setActualCommentary(a.actuallityComment)
  setScoreBox(a.score)
  setScoreCommentary(a.scoreComment)
  setUseability(a.useability)
  setDifficulties(a.difficulties)
  setNewLearnings(a.newLearnings)
  setSuggestions(a.suggestions)
})

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
                <div>Комментарий: {suggestions !== "" ? suggestions : "-"}</div>
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