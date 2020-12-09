import * as React from "react";

export default class WorkerRow extends React.Component<any, any>{
    public render() {
        return (
          <tr>
            <td className="id">{this.props.worker.id}</td>
            <td className="name">{this.props.worker.name}</td>
            <td className="department">{this.props.worker.department}</td>
            <td className="post">{this.props.worker.post}</td>
            <td className="factory">{this.props.worker.factory}</td>
            <td className="competenceLevel">{this.props.worker.competenceLevel}</td>
            <td className="actions">
              <button type="button" className="btn btn-link">Edit</button>
            </td>
            <td className="actions">
              <button type="button" className="btn btn-link">Delete</button>
            </td>
          </tr>
    )
  }
}
