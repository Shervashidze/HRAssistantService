import * as React from "react";
import { Component } from 'react'

export default class WorkerRow extends React.Component<any, any>{
  deleteRow() {
    let id = this.props.worker.id;
    fetch('https://localhost:5001/api/Workers/Delete/' + id, {
      method: 'DELETE'
    });
  }

    public render() {
        return (
          <tr>
            <td className="id">{this.props.worker.id}</td>
            <td className="name">{this.props.worker.name}</td>
            <td className="factory">{this.props.worker.factory}</td>
            <td className="department">{this.props.worker.department}</td>
            <td className="post">{this.props.worker.post}</td>
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
