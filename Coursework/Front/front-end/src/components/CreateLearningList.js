import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { useState, useEffect, useCallback } from 'react'
import { downloadTable, downloadTableWithoutLast2 } from "../services/file-service";


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

        const fetchdata = useCallback(async () => {
            const result = await fetch('https://hrassistantservice.herokuapp.com/Learning/GetAll');
            const events = await result.json();
            setRows(events)
        }, [])
        
        useEffect(() => {
            fetchdata()
        }, [fetchdata])

        function deleteRow(id, index) {
            fetch('https://hrassistantservice.herokuapp.com/Learning/DeleteEvent/' + id, {method: 'DELETE'})
            const copy = [...rows]
            var ans = copy.splice(index, 1)
            setRows(copy)
        }
        
        return (rows.forEach((e) => 
        e["actionChange"]=<a className="btn btn-light"  onClick={() => window.location.href = "http://hrassistantservice.herokuapp.com/editLearningEvent/" + e.id} role="button">Изменить</a>),
        rows.forEach((e, index) => 
        e["actionDelete"]=<a className="btn btn-light" role="button" 
        onClick={() => deleteRow(e.id, index)}>Удалить</a>),
            <>
            <div className='body-custom1'>
            <MDBDataTableV5
            id="LearningEventsTable"
            autoWidth
            striped
            bordered={false}
            btn
            searchTop
            searchBottom={false}
            data = {{columns: columns, rows: rows}}
            />
            <div>
              <a className="btn btn-primary" href="/addLearningEvent" role="button">Добавить обучающее событие</a>
              <a className="btn btn-primary" onClick={() => downloadTableWithoutLast2('LearningEventsTable','1','Обучение.xls')} role="button">Загрузить в виде Excel</a>
            </div>
            </div>
          </>);
}