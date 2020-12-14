import * as React from "react";
import WorkerRow from "./WorkerRow"

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
        return (
          <div className="workers-table">
          <h3>Сотрудники</h3>
          <div>Cписок сотрудников к обучению</div>
            <div className="table table-responsive table-hover col-xs-1">
                <table className="table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Имя</th>
                      <th scope="col">Производство</th>
                      <th scope="col">Подразделение</th>
                      <th scope="col">Должность</th>
                      <th scope="col">Тип персонала</th>
                    </tr>
                    {this.state.workers.map(worker =>
                        <WorkerRow key={worker.id} worker={worker} />)}
                  </tbody>
                </table>
                {this.state.loading && <div>Loading...</div>}
            </div>
          </div>
        );
    }
}
