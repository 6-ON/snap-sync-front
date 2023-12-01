import { TPostForm } from '../../types'
import { PostAT, PostState, TPostAction } from '../actions/types'

export const emptyForm: TPostForm = { title: '', content: '', tags: [], image: '' }

const initialState: PostState = {
	posts: [],
	form: {
		value: emptyForm,
		status: 'idle',
		variant: 'create',
	},
	selectedPost: null,
}

const postReducer = (state: PostState = initialState, { type, payload }: TPostAction): PostState => {
	switch (type) {
		case PostAT.CREATE_POST:
			return {
				...state,
				posts: [...state.posts, payload],
			}
		case PostAT.GET_POSTS:
			return {
				...state,
				posts: payload,
			}
		case PostAT.LIKE_POST:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.id ? { ...post,likes:payload.likes } : post
				),
			}

		case PostAT.UPDATE_POST:
			return {
				...state,
				posts: state.posts.map((post) => (post._id === state.selectedPost ? { ...post, ...payload } : post)),
			}
		case PostAT.SELECT_POST:
			return {
				...state,
				selectedPost: payload.id,
				form: {
					...state.form,
					variant: 'update',
					value: payload.form,
				},
			}
		case PostAT.RESET_FORM:
			return { ...state, selectedPost: null, form: { ...state.form, value: emptyForm, variant: payload } }

		case PostAT.GET_POST:
			throw new Error('GET_POST action is not implemented')
			// return state
		case PostAT.DELETE_POST:
			return { ...state, posts: state.posts.filter(({ _id }) => _id !== payload) }
		case PostAT.CHANGE_FORM_STATUS:
			return { ...state, form: { ...state.form, status: payload } }
		default:
			return state
	}
}

export default postReducer
