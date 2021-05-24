import * as React from "react";
import { MDBDataTable } from 'mdbreact';

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


    public render() {
      this.state.events.forEach(element => 
        element.clickEvent = () => window.location.href = "http://hrassistantservice.herokuapp.com/learning/" + element.id)
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
          }
        ],
        rows: this.state.events
      };

        return (
          <>
          <div className='body-custom'>
          <MDBDataTable
          striped
          bordered
          data = {data}
          />
          </div>
        </>);
    }
}
