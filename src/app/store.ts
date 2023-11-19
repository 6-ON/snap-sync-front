import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import PostSlice from '../components/Post/PostSlice'

export const store = configureStore({
	reducer: {
		post: PostSlice,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export default store