import axios from 'axios';
import jwt_decode from "jwt-decode";

import { selectLoginstatus, unlog } from '../slicers/slicer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Redirect } from 'react'

const API_URL = "https://localhost:4001/api/account/";

export default class AuthService {
  async login(em, pas) {
      const b = JSON.stringify({
        email: em, 
        password: pas
      });
      var result = await fetch('https://localhost:4001/api/account/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: b
      });
  
  
      let data = await result.text();
      let decoded = jwt_decode(data);

      console.log(result)
      return result;
  }
}