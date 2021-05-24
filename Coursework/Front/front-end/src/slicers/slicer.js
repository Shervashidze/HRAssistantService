import { createSlice } from '@reduxjs/toolkit'

export const loginstatusSlice = createSlice({
    name: 'loginstatus',
    initialState: {
        logstatus: 'Admin',
        token: '',
        username: 'admin@gmail.com'
    },
    reducers: {
        login: (state, action) => {
            state.logstatus = action.payload
        },

        tokenize: (state, action) => {
            state.token = action.payload
        },

        setusername: (state, action) => {
            state.username = action.payload
        },

        unlog: state => {
            state.logstatus = 'unlog'
        }
    }
})


export const { login, unlog, tokenize } = loginstatusSlice.actions
export const selectLoginstatus = state => state.loginstatus
export default loginstatusSlice.reducer