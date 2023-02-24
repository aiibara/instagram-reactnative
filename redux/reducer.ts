import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../models/interface'

export interface IHome {
   user: IUser
}

const initialState: IUser = {
   userName: 'jiffpom',
   profilePic: 'https://picsum.photos/1200/1200',
   id: '194146115',
   fullName: 'jiff',
   hasStory: false
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (_state, action: PayloadAction<IUser>) => action.payload
   },
})

export const { setUser } = userSlice.actions
const rootReducer = combineReducers({
   user: userSlice.reducer,
})

export default rootReducer
