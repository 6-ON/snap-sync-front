import { AnyAction, Dispatch } from 'redux'
import { TPost, TPostForm } from '../components/types'
import axios from 'axios'

export interface PostState {
	posts: TPost[]
	form: PostFormState
	selectedPost: string | null
}
export interface PostFormState {
	value: TPostForm
	status: 'idle' | 'loading' | 'failed'
	variant: 'create' | 'update'
}

const emptyForm: TPostForm = { title: '', content: '', tags: [], image: '' }

const initialState: PostState = {
	posts: [],
	form: {
		value: emptyForm,
		status: 'idle',
		variant: 'create',
	},
	selectedPost: null,
}

export enum ActionTypes {
	CREATE_POST = 'CREATE_POST',
	GET_POST = 'GET_POST',
	UPDATE_POST = 'UPDATE_POST',
	DELETE_POST = 'DELETE_POST',
	SELECT_POST = 'SELECT_POST',
	RESET_FORM = 'RESET_FORM',
	GET_POSTS = 'GET_POSTS',
	LIKE_POST = 'LIKE_POST',
	CHANGE_FORM_STATUS = 'CHANGE_FORM_STATUS',
}

export const resetForm = () => {
	return { type: ActionTypes.RESET_FORM, payload: 'create' }
}

// async Thunk
export const setFormPost = (_id: string) => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'loading' })
		try {
			const {
				data: { _id: id, created_at, updated_at, likes, ...formPost },
			} = await axios.get<TPost>('/posts/' + _id)
			dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'idle' })
			return dispatch({ type: ActionTypes.SELECT_POST, payload: { _id, form: formPost } })
		} catch (error) {
			console.log(error)
			dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'failed' })
		}
	}
}

export const createPost = (post: Partial<TPostForm> ) => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'loading' })
		try {
			const { data } = await axios.post<TPost>('/posts', post)
			dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'idle' })
			return dispatch({ type: ActionTypes.CREATE_POST, payload: data })
		} catch (error) {
			console.log(error)
			dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'failed' })
		}
	}
}
export const update = (selectedPost: string, post: TPostForm) => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'loading' })
		try {
			const { data } = await axios.put<TPost>('/posts' + selectedPost, post)
			dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'idle' })
			return dispatch({ type: ActionTypes.UPDATE_POST, payload: data })
		} catch (error) {
			console.log(error)
			dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'failed' })
		}
	}
}

const postReducer = (state: PostState = initialState, { type, payload }: AnyAction): PostState => {
	switch (type) {
		case ActionTypes.CREATE_POST:
			return {
				...state,
				posts: [...state.posts, payload],
			}

		case ActionTypes.UPDATE_POST:
			return {
				...state,
				posts: state.posts.map((post) => (post._id === payload._id ? payload : post)),
			}
		case ActionTypes.SELECT_POST:
			return {
				...state,
				selectedPost: payload._id,
				form: {
					...state.form,
					variant: 'update',
					value: payload.form,
				},
			}
		case ActionTypes.RESET_FORM:
			return { ...state, form: { ...state.form, value: emptyForm, variant: payload } }

		case ActionTypes.GET_POST:
			return state
		case ActionTypes.DELETE_POST:
			return { ...state, posts: state.posts.filter(({ _id }) => _id !== payload.id) }
		case ActionTypes.CHANGE_FORM_STATUS:
			return { ...state, form: { ...state.form, status: payload } }

		default:
			return state
	}
}

export default postReducer
