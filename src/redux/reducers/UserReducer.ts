import { TUserAction, UserAT, UserState } from '../actions/types'

const initialState: UserState = {
	user: null,
	status: 'idle',
}
export function userReducer(state: UserState = initialState, { type, payload }: TUserAction): UserState {
	switch (type) {
		case UserAT.GET_USER:
		case UserAT.AUTH:
			return {
				...state,
				user: payload,
			}
		case UserAT.LOGOUT:
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			return {
				...state,
				user: null,
			}
		case UserAT.CHANGE_STATUS:
			return {
				...state,
				status: payload,
			}
		default:
			return state
	}
}
