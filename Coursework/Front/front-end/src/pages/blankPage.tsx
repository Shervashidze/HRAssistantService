import React from 'react';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';

import { MDBDataTable } from 'mdbreact';


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
        const result = await fetch('https://localhost:8001/Learning/GetLearningEvent/' + a);
        const event = await result.json();
        console.log(event.workers)
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


    public render() {
        if (this.state == null) {
            return(<> <TopBar />
                <NavBar />
                </>);
        }
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
          }
        ],
        rows: this.state.workers
      };
      return(
        <>
        <TopBar />
        <NavBar />
        <h3>Обучение: {this.state.event.name}</h3>
        <React.Fragment>
            {this.state.event.description}
            <div></div>Максимально возможная оценка: {this.state.event.maxScore}
        </React.Fragment>
        <>
              <div className='body-custom'>
              <MDBDataTable
              striped
              bordered
              data = {data}
              />
              </div>
            </>
        </>
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
            const result = await fetch("https://localhost:5001/api/Workers/Worker/" + i.workerId);
            const worker = await result.json();
            this.workers.push(new WorkerRow(worker.name, worker.factory, worker.post, i.initialScore, i.afterwardsScore));
        }
      }

    async getWorkers() {
        for (let i of this.event.workers) {
            const result = await fetch("https://localhost:5001/api/Workers/Worker/" + i.workerId);
            const worker = await result.json();
            this.workers.push(new WorkerRow(worker.name, worker.factory, worker.post, i.initialScore, i.afterwardsScore));
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

    constructor(name: string, factory: string, post: string,
        initialscore: number,
        afterwardsscore: number){
            this.name = name;
            this.factory = factory;
            this.post = post;
            this.initialscore = initialscore;
            this.afterwardsscore = afterwardsscore;
    }
}