import * as React from 'react';
import axios from 'axios';

import '../styles/AddWorker.css';

import {CreateTopBar} from '../components/TopBar';
import NavBar from '../components/NavBar';

export interface IAddWorkerView {
  name: string,
  phoneNumber: string,
  department: string,
  post: string,
  staffCategory: string,
  staffType: string,
  factory: string,
  dateOfBirth: string,
  email: string,
  [key: string]: any;
}

export interface IFormState {
  [key: string]: any;
  values: IAddWorkerView[];
  submitSuccess: boolean;
  loading: boolean;
}

export default class AddWorkerPage extends React.Component<any, IFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      department: '',
      post: '',
      staffCategory: '',
      staffType: '',
      factory: '',
      dateOfBirth: '',
      email: '',
      values: [],
      loading: false,
      submitSuccess: false
    }
  }

  private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      department: this.state.department,
      post: this.state.post,
      staffCategory: this.state.staffCategory,
      staffType: this.state.staffType,
      factory: this.state.factory,
      dateOfBirth: this.state.dateOfBirth,
      email: this.state.email
    }
    this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
    console.log(formData)
    const b = formData
    fetch('https://localhost:5001/api/Workers/Add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(b)
  });
    this.props.history.push("/workers")
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      this.setState({
          [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  public render() {
    const { submitSuccess, loading } = this.state;
    return(
      <>
      {!submitSuccess && (
                      <div className="alert alert-info" role="alert">
                        Введите данные нового сотрудника.
                      </div>
                    )}
      {submitSuccess && (
                      <div className="alert alert-info" role="alert">
                        Сотрудник добавлен.
                      </div>
        )}
      <div className="addWorkerForm">
        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="nam" name="name" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Имя"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Телефон"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="department" name="department" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Подразделение"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="email" name="email" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Эл. Почта"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="post" name="post" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Должность"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="staffCategory" name="staffCategory" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Категория персонала"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="staffType" name="staffType" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Тип персонала"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="factory" name="factory" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Производство"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="dateOfBirth" name="dateOfBirth" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Дата Рождения (гггг-мм-дд)"/>
          </label>
          </div>3
          
          <input type="submit" className="btn btn-primary cbtn" value="Добавить" />
        </form>
      </div>
      </>
    );
  }
}
