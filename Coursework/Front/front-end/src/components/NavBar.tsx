import * as React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class TopBar extends React.Component<any, any>{
  public render() {
    return(
      <Navbar bg="white" variant="light" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="tabs" className="justify-content-center bg-wight m-auto" activeKey={window.location.pathname}>
            <Nav.Item>
              <Nav.Link href="/workers" eventKey="/workers">Сотрудники</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/learning" eventKey="/learning">Обучение</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/dashboards" eventKey="/dashboards">Дэшборды</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">Данные о производстве</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                Мое обучение
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
