import * as React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class TopBar extends React.Component<any, any>{
  public render() {
    return(
    <Nav variant="tabs" className="justify-content-center bg-wight mr-auto nav-pills-underline" activeKey="/home" sticky="top">
      <Nav.Item>
        <Nav.Link href="/home">Сотрудники</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Обучение</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Графики</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Мое обучение
        </Nav.Link>
      </Nav.Item>
    </Nav>
    )
  }
}
