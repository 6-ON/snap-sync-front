import axios from 'axios'
import { Dispatch } from 'redux'
import { TPost, TPostForm } from '../../types'
import { GetRootState } from '../store'
import { PostAT, TStatus, TPostAction } from './types'

// ---------------------------------actions---------------------------------

export const resetForm = (): TPostAction => {
	return { type: PostAT.RESET_FORM, payload: 'create' }
}

export const changeFormStatus = (status: TStatus): TPostAction => ({
	type: PostAT.CHANGE_FORM_STATUS,
	payload: status,
})

export const selectPost = ({ content, tags, image, title, _id: id }: TPost): TPostAction => ({
	type: PostAT.SELECT_POST,
	payload: { id, form: { content, tags, image, title } },
})

export const createPost = (post: TPost): TPostAction => ({ type: PostAT.CREATE_POST, payload: post })

export const deletePost = (id: string): TPostAction => ({ type: PostAT.DELETE_POST, payload: id })

export const updatePost = (updates: Partial<TPostForm>): TPostAction => ({
	type: PostAT.UPDATE_POST,
	payload: updates,
})

export const getPosts = (posts: TPost[]): TPostAction => ({ type: PostAT.GET_POSTS, payload: posts })

export const likePost = (id: string, likes:string[] ): TPostAction => ({
	type: PostAT.LIKE_POST,
	payload: { id, likes },
})

// ---------------------------------thunks---------------------------------
export const setFormPostThunk = (_id: string) => {
	return async (dispatch: Dispatch) => {
		dispatch(changeFormStatus('loading'))
		try {
			const { data: post } = await axios.get<TPost>('/posts/' + _id)
			dispatch(selectPost(post))
			dispatch(changeFormStatus('idle'))
		} catch (error) {
			dispatch(changeFormStatus('failed'))
		}
	}
}

export const createPostThunk = (post: TPostForm) => {
	return async (dispatch: Dispatch) => {
		dispatch(changeFormStatus('loading'))
		try {
			const { data } = await axios.post<TPost>('/posts', post)
			dispatch(createPost(data))
			dispatch(changeFormStatus('idle'))
		} catch (error) {
			dispatch(changeFormStatus('failed'))
		}
	}
}
export const deletePostThunk = (id: string) => {
	return async (dispatch: Dispatch) => {
		try {
			await axios.delete<TPost>('/posts/' + id)
			return dispatch(deletePost(id))
		} catch (error) {
		}
	}
}
export const updatePostThunk = (updates: Partial<TPostForm>) => {
	return async (dispatch: Dispatch, getState: GetRootState) => {
		dispatch(changeFormStatus('loading'))
		try {
			const selectedId = getState().post.selectedPost
			await axios.put('/posts/' + selectedId, updates)
			dispatch(updatePost(updates))
			dispatch(resetForm())
			dispatch(changeFormStatus('idle'))
		} catch (error) {
			dispatch(changeFormStatus('failed'))
		}
	}
}
export const getPostsThunk = () => {
	return async (dispatch: Dispatch) => {
		try {
			const { data: posts } = await axios.get<TPost[]>('/posts')
			dispatch(getPosts(posts))
		} catch (error) {
		}
	}
}
export const likePostThunk = (id: string, isLike: boolean) => {
	return async (dispatch: Dispatch) => {
		try {
			const { data: likes } = await axios.patch<TPost["likes"]>(`/posts/${id}/${!isLike ? 'like' : 'unlike'}`)

			dispatch(likePost(id, likes))
		} catch (error) {
		}
	}
}
