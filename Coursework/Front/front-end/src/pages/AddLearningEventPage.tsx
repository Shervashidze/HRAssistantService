import * as React from 'react';
import axios from 'axios';

import '../styles/AddWorker.css';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';

import ListGroup from 'reactstrap/lib/ListGroup';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export interface IAddLearningEventView {
    name: string,
    capacity: string,
    description: string,
    plannedDate: string,
  [key: string]: any;
}

export interface IFormState {
  [key: string]: any;
  values: IAddLearningEventView[];
  submitSuccess: boolean;
  loading: boolean;
}

export default class AddLearningEvent extends React.Component<any, IFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
        name: '',
        capacity: '',
        description: '',
        plannedDate: '',
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
      capacity: this.state.capacity,
      description: this.state.description,
      plannedDate: this.state.plannedDate,
    }
    this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
    axios.post(`https://localhost:8001/Learning/CreateLearningEvent`, formData).then(data => [
        setTimeout(() => {
            this.props.history.push('/learning');
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
                        Введите данные обучения.
                      </div>
                    )}
      {submitSuccess && (
                      <div className="alert alert-info" role="alert">
                        Обучение добавлено.
                      </div>
        )}
      <div className="addWorkerForm">
        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="name" name="name" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Название обучения"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="capacity" name="capacity" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Количество"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="description" name="description" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Описание"/>
          </label>
          </div>
          <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="plannedDate" name="plannedDate" className="form-control cform-control" onChange={(e) => this.handleInputChanges(e)} placeholder="Планируемая дата"/>
          </label>
          </div>

          <div>
                <form  className="uploader" encType="multipart/form-data" >
                    <input  type="file" name="file" className="upload-file "  />
                    <input  type="submit" value="Добавть файл" className="" />
                </form>
          </div>

          <input type="submit" className="btn btn-primary cbtn" value="Добавить" />
        </form>
      </div>
      </>
    );
  }
}
