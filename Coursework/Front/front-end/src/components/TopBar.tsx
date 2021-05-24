import {Navbar, Nav, NavItem, NavDropdown, Button} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import logoGN from '../imgs/logoGN.png'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom'
import { selectLoginstatus, unlog, login } from '../slicers/slicer'




export function CreateTopBar() {
    const dispatch = useDispatch()
    const log = useSelector(selectLoginstatus)
    const [name, setName] = useState("")
    const [toL, setToL] = useState(false)
    const [toI, setToI] = useState(false)

    const fetchdata = useCallback(async () => {
      let result = await fetch('https://localhost:5001/api/Workers/WorkerByEmail/' + log.username);
      let worker = await result.json();
      setName(worker.name)
  }, [])

  useEffect(() => {
      fetchdata()
  }, [fetchdata])


  function setT() {
    if (toL) {
      setToL(false)
    }
    if (toI) {
      setToI(false)
    }
    setToL(true)
  }

  function setI() {
    if (toL) {
      setToL(false)
    }
    if (toI) {
      setToI(false)
    }
    setToI(true)
  }

    return (
      <>
      {toL ? <Redirect to="/learning"/> : null}
      {toI ? <Redirect to="/info"/> : null}
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
            <NavDropdown.Header>{name}</NavDropdown.Header>
              <NavDropdown.Item onClick={setT}>Обучающие мероприятия</NavDropdown.Item>
              <NavDropdown.Item onClick={setI}>Аккаунт</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                  Выйти
              </NavDropdown.Item>
            </NavDropdown>
        </nav>
        </>
    )

    function logout() {
        dispatch(login("unlog"))
    }
}


