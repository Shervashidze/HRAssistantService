import * as React from "react";
import { Component } from 'react'
//import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
//import 'rsuite-table/lib/less/index.less';

export default class WorkerRow extends React.Component<any, any>{
  deleteRow() {
    let id = this.props.worker.id;
    fetch('https://localhost:5001/api/Workers/Delete/' + id, {
      method: 'DELETE'
    });
  }

  public async fetchWorkerDetails () {
    const result = await fetch('https://localhost:5001/api/Workers/3');
    const workers = await result.json();
    console.log(workers);
      this.setState(
        {
        workers: workers,
        loading: false
        });
  }

    public render() {
        return (
          <tr onClick={() => this.fetchWorkerDetails()}>
            <td className="id">{this.props.worker.id}</td>
            <td className="name">{this.props.worker.name}</td>
            <td className="factory">{this.props.worker.factory}</td>
            <td className="department">{this.props.worker.department}</td>
            <td className="post">{this.props.worker.post}</td>
            <td className="staffType">{this.props.worker.staffType}</td>
            <td className="competenceLevel">{this.props.worker.competenceLevel}</td>
            <td className="actions">
              <button className="btn btn-link">Edit</button>
            </td>
            <td className="actions">
              <button onClick={() => this.deleteRow()} className="btn btn-link" >Delete</button>
            </td>
          </tr>
    )
  }
}
