import * as React from "react";
import { MDBDataTable } from 'mdbreact';
import { downloadTable } from "../services/file-service";

export interface IState {
    loading: boolean;
    events: IEvent[];
}

export interface IEvent {
    id: number,
    name: string,
    capacity: string,
    description: string,
    plannedDate: string,
    [key: string]: any
}

export default class LearningList extends React.Component<any, IState> {

    public state: IState = {
        loading: false,
        "events": []
      };

      public async componentDidMount() {
        this.setState(
          {
            loading:true
          })
        const result = await fetch('https://localhost:8001/Learning/GetAll');
        const events = await result.json();
        events.forEach((e: any) => 
          e["actionChange"]=<a className="btn btn-light"  onClick={() => window.location.href = "http://localhost:3000/editLearningEvent/" + e.id} role="button">Изменить</a>)
        events.forEach((e: any) => 
          e["actionDelete"]=<a className="btn btn-light" role="button" onClick={
          () => fetch('https://localhost:5001/Learning/DeleteEvent/' + e.id, {method: 'DELETE'})
        }>Удалить</a>)
        this.setState(
          {
            events: events,
            loading: false
          });
      }


    public render() {
      this.state.events.forEach(element => 
        element.clickEvent = () => window.location.href = "http://localhost:3000/learning/" + element.id)
      const data = {
        columns: [
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
            field: 'actionChange'
          },
          {
            label: '',
            field: 'actionDelete'
          }
        ],
        rows: this.state.events
      };

        return (
          <>
          <div className='body-custom'>
          <MDBDataTable
          id="LearningEventsTable"
          striped
          bordered
          data = {data}
          />
          <div>
            <a className="btn btn-primary" href="/addLearningEvent" role="button">Добавить обучающее событие</a>
            .
            <a className="btn btn-primary" onClick={
              () => downloadTable('LearningEventsTable','1','Обучение.xls')
            } role="button">Загрузить в виде Excel</a>
          </div>
          </div>
        </>);
    }
}
