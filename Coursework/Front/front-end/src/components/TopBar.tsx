import * as React from "react";
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import logoGN from '../imgs/logoGN.png'

export default class TopBar extends React.Component<any, any>{
  public render() {
      return (
        <nav className="navbar navbar-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src={logoGN}
              width="60" height="30"
              className="d-inline-block align-top" alt=""/>
          </a>
          <div className="navbar-nav navbar-center mb-0 h4">
          Сервис Обучения Персонала
          </div>
          <NavDropdown title="Аккаунт" id="nav-dropdown">
            <NavDropdown.Header>"Мое имя"</NavDropdown.Header>
              <NavDropdown.Item eventKey="4.1">Уведомления</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2" href="/account">Управление аккаунтом</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">Календарь обучения</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4.4">Выйти</NavDropdown.Item>
          </NavDropdown>
        </nav>
    )
  }
}
