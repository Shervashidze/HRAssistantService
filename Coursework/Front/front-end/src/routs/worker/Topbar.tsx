import {Navbar, Nav, NavItem, NavDropdown, Button} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import logoGN from '../../imgs/logoGN.png'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { selectLoginstatus, unlog, login } from '../../slicers/slicer'




export function CreateTopBar() {
    const dispatch = useDispatch()
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
          <Button onClick={logout} >Logout</Button>
        </nav>
    )

    function logout() {
        dispatch(login("unlog"))
    }
}


