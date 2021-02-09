import * as React from "react";
import { MDBDataTable } from 'mdbreact';


export interface IWorker {
    id: number,
    name: string,
    phoneNumber: string,
    department: string,
    post: string,
    staffCategory: string,
    staffType: string,
    factory: string,
    dateOfBirth: string,
    competenceIdsList: [];
}

export interface IState {
    loading: boolean;
    workers: IWorker[];
}

export default class WorkersList extends React.Component<any, IState>
{
  public state: IState = {
    loading: false,
    "workers": []
  };
    public async componentDidMount() {
      this.setState(
        {
          loading:true
        })
      const result = await fetch('https://localhost:5001/api/Workers/All');
      const workers = await result.json();
        this.setState(
          {
          workers:workers,
          loading: false
          });
    }

    public render() {
      const data = {
        columns: [
          {
            label: 'Имя',
            field: 'name',
            sort: 'asc',
            width: 75
          },
          {
            label: 'Производство',
            field: 'factory',
            sort: 'asc',
            width: 135
          },
          {
            label: 'Подразделение',
            field: 'department',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Должность',
            field: 'post',
            sort: 'asc',
            width: 50
          }
        ],
        rows: this.state.workers
      };

        return (
          <>
          <div className='body-custom'>
          <MDBDataTable
          autoWidth
            striped
            bordered
            small
            data={data}
          />
          </div>
        </>);
    }
}
