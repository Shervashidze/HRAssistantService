import * as React from "react";
import { MDBDataTableV5 } from 'mdbreact';
import { downloadTable, downloadTableWithoutLast2 } from "../services/file-service";

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
        const result = await fetch('https://hrassistantservice.herokuapp.com/Learning/GetAll');
        const events = await result.json();
        this.setState(
          {
            events: events,
            loading: false
          });
      }

    deleteRow(id: number) {
      fetch('https://localhost:8001/Learning/DeleteEvent/' + id, {method: 'DELETE'})
      window.location.href = "http://localhost:3000/learning/"
    }

    public render() {
      this.state.events.forEach((e: any) => 
        e["actionChange"]=<a className="btn btn-light"  onClick={() => window.location.href = "http://localhost:3000/editLearningEvent/" + e.id} role="button">Изменить</a>)
      this.state.events.forEach((e: any) => 
        e["actionDelete"]=<a className="btn btn-light" role="button" 
        onClick={() => this.deleteRow(e.id)}>Удалить</a>)
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
            sort: 'disabled',
            field: 'actionChange'
          },
          {
            label: '',
            sort: 'disabled',
            field: 'actionDelete'
          }
        ],
        rows: this.state.events
      };

        return (
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
          data = {data}
          />
          <div>
            <a className="btn btn-primary" href="/addLearningEvent" role="button">Добавить обучающее событие</a>
            <a className="btn btn-primary" onClick={() => downloadTableWithoutLast2('LearningEventsTable','1','Обучение.xls')} role="button">Загрузить в виде Excel</a>
          </div>
          </div>
        </>);
    }
}
