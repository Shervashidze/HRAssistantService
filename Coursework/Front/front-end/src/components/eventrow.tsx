import * as React from "react";
import { Component } from 'react'

export default class eventrow extends React.Component<any, any>{
  deleteRow() {
    let id = this.props.worker.id;
    fetch('https://hrassistantservice.herokuapp.com/api/Workers/Delete/' + id, {
      method: 'DELETE'
    });
  }

    public render() {
        return (
          <tr>
            <td className="id">{this.props.event.id}</td>
            <td className="name">{this.props.event.name}</td>
            <td className="capacity">{this.props.event.capacity}</td>
            <td className="description">{this.props.event.description}</td>
            <td className="plannedDate">{this.props.event.plannedDate}</td>
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
