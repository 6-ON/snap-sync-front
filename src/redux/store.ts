import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import postReducer from './PostReducer'
import { composeWithDevTools } from '@redux-devtools/extension'

const rootReducer = combineReducers({
	post: postReducer,
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export type GetRootState = typeof store.getState
export type RootState = ReturnType<GetRootState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export default store
