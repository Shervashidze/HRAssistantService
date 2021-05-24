import React, { Fragment, useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { Redirect } from 'react-router-dom';
import { FormGroup } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

async function login(em, pas) {
  const b = JSON.stringify({
    email: em, 
    password: pas
  });
  var result = await fetch('https://hrassistantservice.herokuapp.com/api/account/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: b
  });


  return result;
};

const CreateLoginPage = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("") 
  const [ message, setMessage ] = useState("")
  const [ isLoggedIn, setLogged ] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


  const form = useRef();
  const checkBtn = useRef();


  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true)

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {

      var a = await login(username, password)
      if (a.status == 200) {
        let data = await a.text()
        let decoded = jwt_decode(data)
        let role = {
          "type": "loginstatus/login",
          "payload": decoded._role
        }
        let user = {
          "type": "loginstatus/setusername",
          "payload": username
        }
        let token = {
          "type": "loginstatus/tokenize",
          "payload": data
        }
        dispatch(user)
        dispatch(token)
        dispatch(role)
      }

      else if (a.status == 415) {
        this.setState({
          loading: false,
          message: "Network Error"
        });
      }
      else {
        
      }
    }
  }

  return (
      <div className="" id="LoginTable">
        { isLoggedIn ? (<Redirect push to="/info"/>) : null }
        <div className="">

          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <FormGroup>
              <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
            </FormGroup>


            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={checkBtn}
            />
          </Form>
        </div>
      </div>
    )
}

export default CreateLoginPage;
