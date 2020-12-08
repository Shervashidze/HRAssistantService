import * as React from "react";
import WorkerRow from "./WorkerRow"

export interface IWorker {
    id: number,
    name: string,
    phoneNumber: string,
    department: string,
    post: string
    /*staffCategory: string,
    staffType: string,
    factory: string,
    dateOfBirt: string,
    competenceIdsList: [];*/
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
      const result = await fetch('https://localhost:5001/api/Home/Workers');
      const workers = await result.json();
      if (result.ok) {
        this.setState(
          {
          workers:workers,
          loading: false
          });
      }
    }

    public render() {
        return (
            <div className="table table-responsive table-hover ">
                <h1>Workers</h1>
                {this.state.loading && <div>Loading...</div>}
                <table className="table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Имя</th>
                      <th scope="col">Телефон</th>
                      <th scope="col">Производство</th>
                      <th scope="col">Должность</th>
                    </tr>
                    {this.state.workers.map(worker =>
                        <WorkerRow key={worker.id} worker={worker} />)}
                  </tbody>
                </table>
            </div>
        );
    }
}
