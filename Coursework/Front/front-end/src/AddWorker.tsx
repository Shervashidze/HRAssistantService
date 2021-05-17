import * as React from 'react';
import axios from 'axios';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';

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

export default class AddWorker extends React.Component<any, IFormState> {
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
    axios.post(`https://localhost:5001/api/Workers/Add`, formData).then(data => [
        setTimeout(() => {
            this.props.history.push('/workers');
        }, 1500)
    ]);
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
      <TopBar />
      <NavBar />
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
      <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
        <div>
        <label htmlFor="name">
          Имя:
          <input type="text" id="name" name="name" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="phoneNumber">
          Телефон:
          <input type="text" id="phoneNumber" name="phoneNumber" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="department">
          Подразделение:
          <input type="text" id="department" name="department" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="email">
          Эл. Почта:
          <input type="text" id="email" name="email" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="post">
          Должность:
          <input type="text" id="post" name="post" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="staffCategory">
          Категория персонала:
          <input type="text" id="staffCategory" name="staffCategory" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="staffType">
          Тип персонала:
          <input type="text" id="staffType" name="staffType" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="factory">
          Производство:
          <input type="text" id="factory" name="factory" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        <div>
        <label htmlFor="dateOfBirth">
          Дата Рождения:
          <input type="text" id="dateOfBirth" name="dateOfBirth" onChange={(e) => this.handleInputChanges(e)} />
        </label>
        </div>
        
        <input type="submit" value="Добавить" />
      </form>
      </>
    );
  }
}
