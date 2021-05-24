import * as React from "react";
import { MDBDataTable } from 'mdbreact';
import emptyAvatar from '../imgs/avatar.png'
import { useState, useEffect, useCallback } from 'react'

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
    competenceIdsList: [],
    email: string,
    [key: string]: any;
}

export interface IState {
    loading: boolean;
    workers: IWorker[];
    worker: IWorker;
}

export default class WorkersList extends React.Component<any, IState>
{

  public state: IState = {
    loading: false,
    "workers": [],
    "worker": {} as IWorker
  };
    public async componentDidMount() {
      this.setState(
        {
          loading:true
        })
      const result = await fetch('https://hrassistantservice.herokuapp.com/api/Workers/All');
      const workers = await result.json();
      const resultWorker = await fetch('https://hrassistantservice.herokuapp.com/api/Workers/Worker/1');
      const worker = await resultWorker.json();
      
      workers.forEach((e: any) => 
        e["actionChange"]=<a className="btn btn-light" href="/editWorker" role="button">Изменить</a>)
      workers.forEach((e: any) => 
        e["actionDelete"]=<a className="btn btn-light" role="button" onClick={
          () => fetch('https://hrassistantservice.herokuapp.com/api/Workers/Delete/' + e.id, {method: 'DELETE'})
        }>Удалить</a>)
        
      this.setState(
        {
        workers:workers,
        worker:worker,
        loading: false
        });
    }

    public async handleTableClick(path:string) {
      const result = await fetch(path);
      const worker = await result.json();
      this.setState(
        {
        worker:worker,
        loading: false
        });
    }

    public render() {
      this.state.workers.forEach(element => 
        element.clickEvent = () => {
          const path = "https://hrassistantservice.herokuapp.com/api/Workers/Worker/" + element.id;
          this.handleTableClick(path);
        })
      const data = {
        columns: [
          {
            label: 'Имя',
            field: 'name',
            sort: 'asc',
            width: 75
          },
          {
            label: 'Эл. Почта',
            field: 'email',
            sort: 'asc',
            width: 50
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
        rows:
          this.state.workers,
      };

        return (
          <>
          <div className='body-custom'>
          <MDBDataTable
          autoWidth
            bordered
            small
            hover
            data={data}
          />
          <div>
            <a className="btn btn-primary" href="/addWorker" role="button">Добавить работника</a>
            .
            <a className="btn btn-primary" href="https://hrassistantservice.herokuapp.com/api/Workers/Excel" role="button">Загрузить в виде Excel</a>
          </div>
          </div>
          <div id='worker-card' className='card'>
        <div className="card-header">
          Сотрудник
        </div>
        <img src={emptyAvatar} className='card-img-top'/>
        <div className='card-body'>
          <h5 className='card-title'>{this.state.worker.name}</h5>
          <p className='card-text'>
          <ul className=''>
          <li className=''>Email: {this.state.worker.email}</li>
          <li className=''>Должность: {this.state.worker.post}</li>
          <li className=''>Телефон: {this.state.worker.phoneNumber}</li>
          <li className=''>Дата рождения: {this.state.worker.dateOfBirth}</li>
          <li className=''>Производство: {this.state.worker.factory}</li>
          <li className=''>Подразделение: {this.state.worker.department}</li>
          <li className=''>Категория персонала: {this.state.worker.staffCategory}</li>
          <li className=''>Тип персонала: {this.state.worker.staffType}</li>
          </ul>
          {this.state.loading && <div>Loading...</div>}
          </p>
          <a href="/learning" className="card-link  justify-content-center">Обучение</a>
          <a href="/learning" className="card-link  justify-content-center">Курсы</a>
          <a href="/learning" className="card-link  justify-content-center">Компетенции</a>
        </div>
      </div>
        </>);
    }
}
