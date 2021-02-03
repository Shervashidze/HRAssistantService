import * as React from "react";
import emptyAvatar from '../imgs/avatar.png'

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
    worker: IWorker;
}

export default class WorkerCard extends React.Component<any, IState>
{
  public state: IState = {
    loading: false,
    "worker":
    {id: 1,
    name: "Андреев Антон Иванович",
    phoneNumber: "88123538933",
    department: "Нефтяной-район №2",
    post: "Машинист буровой установки",
    staffCategory: "Инженерно-технический",
    staffType: "Оперативно-ремонтный",
    factory: "ПрЭО «Ямал»",
    dateOfBirth: "1982-10-13",
    competenceIdsList: []}
  };

  public async componentDidMount() {
    this.setState(
      {
        loading:true
      })
    const result = await fetch('https://localhost:5001/api/Worker/1');
    const worker = await result.json();
      this.setState(
        {
        worker:worker,
        loading: false
        });
  }

  public render() {
    return(
      <div id='worker-card' className='card'>
        <div className="card-header">
          Сотрудник
        </div>
        <img src={emptyAvatar} className='card-img-top'/>
        <div className='card-body'>
          <h5 className='card-title'>{this.state.worker.name}</h5>
          <p className='card-text'>
          <ul className=''>
          <li className=''>{this.state.worker.post}</li>
          <li className=''>Телефон: {this.state.worker.phoneNumber}</li>
          <li className=''>Дата рождения: {this.state.worker.dateOfBirth}</li>
          <li className=''>Производство: {this.state.worker.factory}</li>
          <li className=''>Подразделение: {this.state.worker.department}</li>
          <li className=''>Категория персонала: {this.state.worker.staffCategory}</li>
          <li className=''>Тип персонала: {this.state.worker.staffType}</li>
          </ul>
          </p>
          <a href="/learning" className="card-link  justify-content-center">Обучение</a>
          <a href="/learning" className="card-link  justify-content-center">Курсы</a>
          <a href="/learning" className="card-link  justify-content-center">Компетенции</a>
        </div>
      </div>
  );
  }
}
