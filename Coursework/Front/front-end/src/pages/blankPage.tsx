import React from 'react';

import {CreateTopBar} from '../components/TopBar';
import NavBar from '../components/NavBar';

import { MDBDataTable, MDBDataTableV5 } from 'mdbreact';

import { downloadTable, downloadTableWithoutLast2 } from "../services/file-service";
import {Example} from '../components/addWorkerPopUp'


export interface IState {
    loading: boolean;
    event: IEvent;
    workers: WorkerRow[];
}

export interface IEvent {
    id: number,
    name: string,
    plannedDate: string,
    competencesId: IComp[],
    workers: IWorker[],
    maxScore: number,
    description: string
}

export interface IComp {
    id: number,
    competenceId: number,
    learningEventId: number
}

export interface IWorker {
    id: number,
    workerId: number,
    initialScore: number,
    afterwardsScore: number
}

export default class blankPage extends React.Component<any, IState> {  
    public state: IState = {
        loading: false,
        "event": {
            id: 0,
            name: "name",
            plannedDate: "sa",
            competencesId: [],
            workers: [],
            maxScore: 12,
            description: "ss"
        },
        "workers": []
      };

    
    async componentDidMount() {
        const a = this.props.match.params.id;
        const result = await fetch('https://hrassistantservice.herokuapp.com/Learning/GetLearningEvent/' + a);
        const event = await result.json();
        this.setState(
            {
              event: event,
              loading: false,
            });

        let k = new WorkersList(this.state.event);
        let j = await k.getWorkers();
        this.setState(
            {
              workers: j
            });
    }

    createDel(e: WorkerRow, row: number) {
      return  <a className="btn btn-light" role="button" onClick={() => this.delWorker(e.id, row)}>Удалить</a>
    }

    async delWorker(id: number,row: number) {
      var copy = this.state.workers
      var ans = copy.splice(row, 1)
      this.setState({workers: copy})
      var eve = this.state.event
      var w = eve.workers.filter(e => e.workerId !== id)
      eve.workers = w
      eve.workers.forEach(el => el.id = el.workerId)

      var r = await fetch('https://hrassistantservice.herokuapp.com/Learning/UpdateEvent/' + this.state.event.id, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(eve)
      });
    }

    public render() {
        if (this.state == null) {
            return(<> <CreateTopBar />
                <NavBar />
                </>);
        }

      this.state.workers.forEach
      ((e: any, index) => e["actionDelete"]=this.createDel(e as WorkerRow, index))

      const data = {
        columns: [
          {
            label: 'Имя',
            field: 'name',
            sort: 'asc',
            width: 75
          },
          {
            label: 'Должность',
            field: 'post',
            sort: 'asc',
            width: 135
          },
          {
            label: 'Производство',
            field: 'factory',
            sort: 'asc',
            width: 300
          },
          {
            label: 'Оценка до обучения',
            field: 'initialscore',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Оценка после обучения',
            field: 'afterwardsscore',
            sort: 'asc',
            width: 100
          },
          {
            label: '',
            sort: 'disabled',
            field: 'actionDelete'
          }
        ],
        rows: this.state.workers
      };

      return(
        <div>
        <div id="editLP">
        <h3>Обучение: {this.state.event.name}</h3>
        <React.Fragment>
            {this.state.event.description}
            <div></div>Максимально возможная оценка: {this.state.event.maxScore}
        </React.Fragment>
        <>
              <div className='body-custom1'>
              <MDBDataTableV5
              striped
              bordered={false}
              btn
              searchTop
              searchBottom={false}
              data = {data}
              />
              <div>
                <Example/>
                <a className="btn btn-primary" onClick={() => downloadTableWithoutLast2('LearningEventsTable','1','Обучение.xls')} role="button">Загрузить в виде Excel</a>
              </div>
              </div>
            </>
        </div>
        </div>
      );
    }
}

class WorkersList {
    event: IEvent;
    workers: WorkerRow[];

    constructor(event: IEvent) {
        this.event = event;
        this.workers = [];
    }

    async componentDidMount() {
        for (let i of this.event.workers) {
            const result = await fetch("https://hrassistantservice.herokuapp.com/api/Workers/Worker/" + i.workerId);
            const worker = await result.json();
            this.workers.push(new WorkerRow(worker.name, worker.factory, worker.post, i.initialScore, i.afterwardsScore, worker.id));
        }
      }

    async getWorkers() {
        for (let i of this.event.workers) {
            const result = await fetch("https://hrassistantservice.herokuapp.com/api/Workers/Worker/" + i.workerId);
            const worker = await result.json();
            this.workers.push(new WorkerRow(worker.name, worker.factory, worker.post, i.initialScore, i.afterwardsScore, i.workerId));
        }

        return this.workers;
    }
}

class WorkerRow {
    name: string;
    factory: string;
    post: string;
    initialscore: number;
    afterwardsscore: number;
    id: number;

    constructor(name: string, factory: string, post: string,
        initialscore: number,
        afterwardsscore: number, id: number){
            this.name = name;
            this.factory = factory;
            this.post = post;
            this.initialscore = initialscore;
            this.afterwardsscore = afterwardsscore;
            this.id = id;
    }
}