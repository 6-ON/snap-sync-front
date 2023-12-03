export type TLoginForm = {
	email: string
	password: string
}
export type TRegisterForm = TLoginForm & {
	name: string
	image?: string
}
