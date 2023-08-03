import {configureStore} from '@reduxjs/toolkit'
import articleSlice from '@redux/freatures/articleSlice'


export const store = configureStore({
    reducer:{
        articleSlice,
    }
})