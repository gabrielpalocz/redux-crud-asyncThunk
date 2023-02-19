import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './feactures/counter/counterSlice'
import userCrudReducer from './feactures/userCrud/userCrudSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        userCrud: userCrudReducer
    }
})