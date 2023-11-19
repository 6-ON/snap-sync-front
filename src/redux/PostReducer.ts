import { AnyAction, Dispatch } from 'redux'
import { TPost, TPostForm } from '../components/types'


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
		const { _id, created_at, updated_at, likes, ...formPost } = await new Promise<TPost>((resolve) =>
			setTimeout(
				() =>
					resolve({
						_id: '1',
						title: 'title',
						content: 'content',
						tags: ['ezjkh', 'ferfe', 'gregrege', 'gergggggge'],
						image: 'frefiorefeg',
						created_at: '',
						updated_at: '',
						likes: 0,
					}),
				1000
			)
		)
		dispatch({ type: ActionTypes.CHANGE_FORM_STATUS, payload: 'idle' })
		return dispatch({ type: ActionTypes.SELECT_POST, payload: { _id, form: formPost } })
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
