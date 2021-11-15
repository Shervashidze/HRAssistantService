import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { useState, useEffect } from 'react'
import { downloadTable, downloadTableWithoutLast2 } from "../services/file-service";
import { fetchAllLearningEvents, deleteLearningEvent } from '../services/fetch-service'
import { Link } from 'react-router-dom'


export function CreateLearningList() {
    const [columns, setColumns] = useState(
        [
            {
              label: 'Название',
              field: 'name',
              sort: 'asc',
              width: 75
            },
            {
              label: 'Прогресс',
              field: 'capacity',
              sort: 'asc',
              width: 135
            },
            {
              label: 'Описание',
              field: 'description',
              sort: 'asc',
              width: 300
            },
            {
              label: 'Планируемая дата обучения',
              field: 'plannedDate',
              type: 'date',
              sort: 'asc',
              width: 100
            },
            {
              label: '',
              sort: 'disabled',
              field: 'actionChange'
            },
            {
              label: '',
              sort: 'disabled',
              field: 'actionDelete'
            }
          ])

        const [rows, setRows] = useState([])
        
        useEffect(() => {
            fetchAllLearningEvents().then((events) => {
              events.forEach(e => 
                e.plannedDate = e.plannedDate.substring(0, 10)
              )

              setRows(events)
            })
        }, [])

        function deleteRow(id, index) {
            deleteLearningEvent(id);
            const copy = [...rows]
            var ans = copy.splice(index, 1)
            setRows(copy)
        }

        function initButtons() {
          rows.forEach((e) => 
          e["actionChange"]=<Link to={"/learning/" + e.id} className="btn btn-light">Просмотреть</Link>)

          rows.forEach((e, index) => 
          e["actionDelete"]=<a className="btn btn-light" role="button" 
          onClick={() => deleteRow(e.id, index)}>Удалить</a>)
        }
        

        initButtons()
        return (
            <>
            <div className='body-custom1'>
            <MDBDataTableV5
            id="LearningEventsTable"
            striped
            bordered={false}
            btn
            searchTop
            searchBottom={false}
            data = {{columns: columns, rows: rows}}
            />
            <div>
              <a className="btn btn-primary" href="/addLearningEvent" role="button">Добавить обучающее событие</a>
              <a className="btn btn-primary" onClick={() => downloadTableWithoutLast2('LearningEventsTable','1','Обучение')} role="button">Загрузить в виде Excel</a>
            </div>
            </div>
          </>);
}