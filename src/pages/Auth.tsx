import React, { useEffect } from 'react'
import { Link,useHistory, useRouteMatch } from 'react-router-dom'
import { useTitle } from '../hooks'
import { LockOutlined } from '@mui/icons-material'
import { Container, CssBaseline, Box, Avatar, Typography, Button, Grid } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { loginThunk, registerThunk } from '../redux/actions'
import { TRegisterForm } from '../types'

type TForm = {
	email: string
	password: string
	firstName?: string
	lastName?: string
	confirmPassword?: string
}
const loginSchema = Joi.object<TForm>({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(8).required(),
}).unknown()
const registerSchema = loginSchema.keys({
	confirmPassword: Joi.string()
		.valid(Joi.ref('password'))
		.required()
		.messages({ 'any.only': 'Passwords should be equal' }),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
})

const Auth = () => {
	const history = useHistory()
	const user = useAppSelector((state) => state.user.user)

	useEffect(() => {
		user && history.push('/')
	}, [user, history])


	const dispatch = useAppDispatch()
	useTitle('Authentification')
	const isLogin = useRouteMatch('/login')?.isExact
	const {
		control,
		handleSubmit,
		reset,
	} = useForm<TForm>({
		resolver: joiResolver(isLogin ? loginSchema : registerSchema),
		mode: 'onTouched',
		defaultValues: { email: '', password: '', firstName: '', lastName: '', confirmPassword: '' },
	})

	useEffect(() => {
		reset()
	}, [isLogin, reset])

	const onSubmit: SubmitHandler<TForm> = async (data) => {
		if (isLogin) {
			dispatch<any>(loginThunk({ email: data.email, password: data.password }))
		} else {
			const { confirmPassword, firstName, lastName, ...rest } = data
			const payload: TRegisterForm = { ...rest, name: `${firstName} ${lastName}` }
			dispatch<any>(registerThunk(payload))
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					{isLogin ? 'Sign In' : 'Sign Up'}
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
					{!isLogin && (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Input name="lastName" label="Last Name" type="text" control={control} />
								</Grid>
								<Grid item xs={12} sm={6}>
									<Input name="firstName" label="First Name" type="text" control={control} />
								</Grid>
							</Grid>
						</>
					)}

					<Input name="email" label="Email" type="email" control={control} />
					<Input name="password" label="Password" type="password" control={control} />
					{!isLogin && (
						<Input name="confirmPassword" label="Confirm Password" type="password" control={control} />
					)}

					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						{isLogin ? 'Sign In' : 'Sign Up'}
					</Button>
					<Grid container>
						<Grid item>
							{isLogin ? (
								<Typography>
									Don't have an account? <Link to="/register">Sign Up</Link>
								</Typography>
							) : (
								<Typography>
									Already have an account ? <Link to="/login">Sign In</Link>
								</Typography>
							)}
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default Auth
