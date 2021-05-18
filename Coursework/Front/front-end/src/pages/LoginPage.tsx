import React from 'react';

import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import logoGN from '../imgs/logoGN.png'

import CreateLoginPage from '../components/login.component';
import emptyAvatar from '../imgs/avatar_1.png';

export default class LoginPage extends React.Component<any, any> {
  public render() {
    var x = (
        <>
        <TopBar/>
        <div id="Login">
            <img src={emptyAvatar} className='card-img-top' id="loginIm"/>
              <textarea id="logintext" disabled
                value="Добро пожаловать! Пожалуйста, введите имя пользователя и пароль.">
              </textarea>
              <textarea id="logintext" disabled
                value="По вопросам активации учетной записи или восстановления пароля обращайтесь к администрации.">
              </textarea>
            <CreateLoginPage/>
        </div>
        </>
      );
    return x;
  }
}

class TopBar extends React.Component<any, any>{
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
          </nav>
      )
    }
  }
  