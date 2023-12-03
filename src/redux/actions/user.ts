import { Dispatch } from 'redux'
import { TStatus, TUserAction, Tokens, UserAT } from './types'
import { TLoginForm, TRegisterForm, TUser } from '../../types'
import axios from 'axios'
import { CredentialResponse } from '@react-oauth/google'
import { googleOAuthInstance } from '../../config/axios'

export const changeStatus = (status: TStatus): TUserAction => ({ type: UserAT.CHANGE_STATUS, payload: status })
export const auth = (payload: TUser): TUserAction => ({ type: UserAT.AUTH, payload })
export const logout = (): TUserAction => ({ type: UserAT.LOGOUT })
export const getUser = (payload: TUser): TUserAction => ({ type: UserAT.GET_USER, payload })

export const googleAuthThunk = (credentials: CredentialResponse) => async (dispatch: Dispatch<TUserAction>) => {
	try {
		dispatch(changeStatus('loading'))
		const { data } = await googleOAuthInstance.post<Tokens>('/', {}, {
			headers: { Authorization: `Bearer ${credentials.credential}` },
		})
		localStorage.setItem('access_token', data.auth.access_tocken)
		localStorage.setItem('refresh_token', data.auth.refresh_token)
		dispatch(auth(data.user))
		dispatch(changeStatus('idle'))
	} catch (err) {
		dispatch(changeStatus('failed'))
	}
}

export const registerThunk = (form: TRegisterForm) => async (dispatch: Dispatch<TUserAction>) => {
	try {
		dispatch(changeStatus('loading'))
		const { data } = await axios.post<Tokens>('/auth/register', form)
		localStorage.setItem('access_token', data.auth.access_tocken)
		localStorage.setItem('refresh_token', data.auth.refresh_token)
		dispatch(auth(data.user))
		return dispatch(changeStatus('idle'))
	} catch (error) {
		dispatch(changeStatus('failed'))
	}
}

export const loginThunk = (form: TLoginForm) => async (dispatch: Dispatch<TUserAction>) => {
	try {
		dispatch(changeStatus('loading'))
		const { data } = await axios.post<Tokens>('/auth/login', form)
		localStorage.setItem('access_token', data.auth.access_tocken)
		localStorage.setItem('refresh_token', data.auth.refresh_token)
		dispatch(auth(data.user))
		return dispatch(changeStatus('idle'))
	} catch (error) {
		dispatch(changeStatus('failed'))
	}
}
export const getUserThunk = () => async (dispatch: Dispatch<TUserAction>) => {
	try {
		dispatch(changeStatus('loading'))
		const { data } = await axios.get<TUser>('/auth/me')
		dispatch(getUser(data))
		return dispatch(changeStatus('idle'))
	} catch (error) {
		dispatch(changeStatus('failed'))
	}
}
