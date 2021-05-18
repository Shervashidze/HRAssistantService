import { configureStore } from '@reduxjs/toolkit'
import loginstatusReducer from '../slicers/slicer'


export default configureStore({
    reducer: {
      loginstatus: loginstatusReducer
    }
  })