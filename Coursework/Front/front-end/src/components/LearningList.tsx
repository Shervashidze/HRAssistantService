import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import EventRow from './eventrow';


interface IState {
    loading: boolean;
    events: IEvent[];
}

interface IEvent {
    id: number,
    name: string,
    capacity: string
    description: string,
    plannedDate: string;
}

export default class LearningList extends React.Component<any, IState> {

    public state: IState = {
        loading: false,
        "events": []
      };

      public async componentDidMount() {
        this.setState(
          {
            loading:true
          })
        const result = await fetch('https://localhost:8001/Learning/All');
        const workers = await result.json();
          this.setState(
            {
            events:workers,
            loading: false
            });
      }


    public render() {
        return (
          <div className="events-table">
          <h3>"Производство"</h3>
          <div>Cписок запланнированных обучений</div>
            <div className="table table-responsive table-hover ">
                <table className="table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Название</th>
                      <th scope="col">Прогресс</th>
                      <th scope="col">Описание</th>
                      <th scope="col">Планируемая дата</th>
                    </tr>
                    {this.state.events.map(event =>
                        <EventRow key={event.id} event={event} />)}
                  </tbody>
                </table>
                {this.state.loading && <div>Loading...</div>}
            </div>
          </div>
        );
    }
}
