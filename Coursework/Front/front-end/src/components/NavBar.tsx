import * as React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class TopBar extends React.Component<any, any>{
  public render() {
    return(
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="tabs" className="justify-content-center bg-light m-auto" activeKey={window.location.pathname}>
            <Nav.Item>
              <Nav.Link href="/workers" eventKey="/workers">Сотрудники</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/learning" eventKey="/learning">Обучение</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
