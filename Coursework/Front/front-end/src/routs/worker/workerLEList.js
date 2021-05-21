
import { selectLoginstatus, login, unlog } from '../../slicers/slicer'
import { useSelector, useH } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { MDBDataTable } from 'mdbreact';
import Button from 'react'
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";


export function LEList () {
  const log = useSelector(selectLoginstatus)
  const [events, setEvents] = useState([])
  const history = useHistory()
  const data = {
    columns: [
      {
        label: 'Название',
        field: 'name',
        sort: 'asc',
        width: 75
      },
      {
        label: 'Описание',
        field: 'description',
        sort: 'asc',
        width: 135
      },
      {
        label: 'Начальный результат',
        field: 'initialScore',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Конечный результат',
        field: 'afterwardsScore',
        sort: 'asc',
        width: 50
      },
      {
          label: 'Обратная связь',
          field: 'action'
      }
    ],
    rows: events,
  };


  const fetchdata = useCallback(async () => {
    let result = await fetch('https://localhost:5001/api/Workers/WorkerByEmail/' + log.username);
    let worker = await result.json();
    console.log(worker)
    let result1 = await fetch('https://localhost:8001/Learning/GetAllById/' + worker.id)
    let events1 = await result1.json();
    events1.forEach(e => e["action"]=<button className="btn btn-light"  onClick={<div></div>}>Заполнить форму</button>)
    setEvents(events1)
}, [])

useEffect(() => {
    fetchdata()
}, [fetchdata])

function redir(id) {

}

return(console.log(events),
data.rows.forEach(row => row.clickEvent = ()  => history.push("/learning/" + row.id)),
<MDBDataTable
sortable
striped
bordered
small
data={data}
    />)
} 

