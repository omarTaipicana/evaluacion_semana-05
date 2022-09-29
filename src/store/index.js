import { configureStore } from '@reduxjs/toolkit'
import changeSlice from './slices/change.slice'
import  usersSlice  from './slices/users.slice'

export default configureStore({
    reducer: {
        user:usersSlice,  
        change:changeSlice,
    }
})