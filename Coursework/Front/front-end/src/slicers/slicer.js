import { createSlice } from '@reduxjs/toolkit'

export const loginstatusSlice = createSlice({
    name: 'loginstatus',
    initialState: {
        logstatus: localStorage.getItem("_status") !== null ? localStorage.getItem("_status") : 'unlog',
        token: localStorage.getItem("_token") !== null ? localStorage.getItem("_token") : '',
        username:  localStorage.getItem("_user") !== null ? localStorage.getItem("_user") : ''
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem("_status",action.payload)
            state.logstatus = action.payload
        },

        tokenize: (state, action) => {
            localStorage.setItem("_token",action.payload)
            state.token = action.payload
        },

        setusername: (state, action) => {
            localStorage.setItem("_user",action.payload)
            state.username = action.payload
        },

        unlog: state => {
            localStorage.removeItem("_token")
            localStorage.removeItem("_user")
            localStorage.removeItem("_status")
            state.logstatus = 'unlog'
        }
    }
})


export const { login, unlog, tokenize } = loginstatusSlice.actions
export const selectLoginstatus = state => state.loginstatus
export default loginstatusSlice.reducer
