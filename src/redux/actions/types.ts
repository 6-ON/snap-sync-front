import { TPost, TPostForm, TUser } from '../../types'

export type TStatus = 'idle' | 'loading' | 'failed'

// --------------------------------- Post Types ---------------------------------
/**
 *  Post Action Types enum
 */
export enum PostAT {
	CREATE_POST = 'posts/CREATE_POST',
	GET_POST = 'posts/GET_POST',
	UPDATE_POST = 'posts/UPDATE_POST',
	DELETE_POST = 'posts/DELETE_POST',
	SELECT_POST = 'posts/SELECT_POST',
	RESET_FORM = 'posts/RESET_FORM',
	GET_POSTS = 'posts/GET_POSTS',
	LIKE_POST = 'posts/LIKE_POST',
	CHANGE_FORM_STATUS = 'CHANGE_FORM_STATUS',
}
export type PostFormVariant = 'create' | 'update'

export interface PostState {
	posts: TPost[]
	form: PostFormState
	selectedPost: string | null
}
export interface PostFormState {
	value: TPostForm
	status: TStatus
	variant: PostFormVariant
}

export type TPostAction =
	| { type: PostAT.CREATE_POST; payload: TPost }
	| { type: PostAT.GET_POST; payload: TPost }
	| { type: PostAT.UPDATE_POST; payload: Partial<TPostForm> }
	| { type: PostAT.DELETE_POST; payload: string }
	| { type: PostAT.SELECT_POST; payload: { id: string; form: TPostForm } }
	| { type: PostAT.RESET_FORM; payload: PostFormVariant }
	| { type: PostAT.GET_POSTS; payload: TPost[] }
	| { type: PostAT.LIKE_POST; payload: { id: string; likes:TPost["likes"] } }
	| { type: PostAT.CHANGE_FORM_STATUS; payload: TStatus }

// --------------------------------- User Types ---------------------------------
export interface UserState {
	user: TUser | null
	status: TStatus
}
export enum UserAT {
	AUTH = 'user/AUTH',
	LOGOUT = 'user/LOGOUT',
	GET_USER = 'user/GET_USER',
	CHANGE_STATUS = 'user/CHANGE_STATUS',
}
export type Tokens = { user:TUser; auth:{ access_tocken: string; refresh_token: string} }
export type TUserAction =
	| { type: UserAT.AUTH | UserAT.GET_USER; payload: TUser }
	| { type: UserAT.LOGOUT; payload?: undefined }
	| { type: UserAT.CHANGE_STATUS; payload: TStatus }
