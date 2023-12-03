import axios, { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { Tokens } from '../redux/actions/types'
import store from '../redux/store'
import { auth } from '../redux/actions'

const baseURL = process.env.REACT_APP_API_URL!
axios.defaults.baseURL = baseURL
const refreshInstance = axios.create({ baseURL })
export const googleOAuthInstance = axios.create({ baseURL: `${baseURL}/auth/google` })
axios.interceptors.request.use((config) => {
	if (localStorage.getItem('access_token'))
		config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
	return config
})

axios.interceptors.response.use(
	(config) => config,
	async (error: AxiosError) => {
		const originalRequest = error.config
		const { data, status } = error.response!

		if (status === 401) {
			localStorage.removeItem('access_token')
			const refreshToken = localStorage.getItem('refresh_token')

			if (refreshToken) {
				try {
					const {
						data: { auth: tokens, user },
					} = await refreshInstance.get<Tokens>('/auth/refresh', {
						headers: {
							Authorization: `Bearer ${refreshToken}`,
						},
					})
					store.dispatch(auth(user))
					localStorage.setItem('access_token', tokens.access_tocken)
					localStorage.setItem('refresh_token', tokens.refresh_token)
					return axios(originalRequest!)
				} catch (err) {
					localStorage.clear()
				}
			}
		}

		if (status === 400) {
			if (data instanceof Array) {
				data.forEach((err: any) =>
					Object.entries(err.constraints).forEach(([key, value]) =>
						enqueueSnackbar(value as string, { variant: 'error' })
					)
				)
			}
		}
		if (status === 422) {
			const hh = data as { message: string }
			enqueueSnackbar(hh.message, { variant: 'error' })
		}
		return Promise.reject(error)
	}
)
