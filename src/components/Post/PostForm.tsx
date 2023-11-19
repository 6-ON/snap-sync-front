/* eslint-disable react-hooks/exhaustive-deps */
import { CloudUpload } from '@mui/icons-material'
import { Autocomplete, Backdrop, Button, Chip, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { TPostForm } from '../types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
// import { changeFormVariant, createPost, getPost, updatePost } from '../../redux/PostReducer'
import { toBase64 } from '../../utils'
import { resetForm, setFormPost } from '../../redux/PostReducer'

const PostForm: FC = () => {
	const { status, variant, value: formValue } = useAppSelector((state) => state.post.form)
	const dispatch = useAppDispatch()

	const { handleSubmit, control, reset } = useForm<TPostForm>({
		defaultValues: formValue,
		// reValidateMode: 'onBlur', 'onChange'] ,
	})
	const onSubmit: SubmitHandler<TPostForm> = (data) => {
		// if (variant === 'create') dispatch(createPost(data))
		// else dispatch(updatePost({ _id: 'sfze', data }))
	}

	useEffect(() => {
		reset(formValue)
	}, [formValue])

	return (
		<>
			<Backdrop
				sx={{ color: '#fff', position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={status === 'loading'}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Typography
				variant="h4"
				textTransform="capitalize"
				align="center"
				fontWeight={'bold'}
				marginBottom={'1rem'}
			>
				{variant} Post
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<Controller
						control={control}
						name={'title'}
						rules={{
							required: { value: true, message: 'Title is required' },
							pattern: { value: /\w+/i, message: 'Title must be at least 3 characters long' },
						}}
						render={({ field, fieldState: { error, invalid } }) => (
							<TextField
								{...field}
								label="title"
								variant="outlined"
								error={invalid}
								helperText={error?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name={'content'}
						rules={{
							required: { value: true, message: 'Content is required' },
							pattern: {
								value: /\w+/i,
								message: 'Content must be at least 3 characters long',
							},
						}}
						render={({ field, fieldState }) => (
							<TextField
								label="content"
								variant="outlined"
								{...field}
								error={Boolean(fieldState.invalid)}
								helperText={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						name="tags"
						control={control}
						rules={{
							required: { value: true, message: 'Tags are required' },
						}}
						render={({ field, fieldState: { invalid, error } }) => (
							<Autocomplete
								{...field}
								options={[]}
								renderTags={(tags, getTagProps) =>
									tags.map((tag, index) => <Chip {...getTagProps({ index })} label={tag} />)
								}
								renderInput={(params) => (
									<TextField {...params} error={invalid} helperText={error?.message} />
								)}
								multiple
								freeSolo
								onChange={(e, value) => field.onChange(value)}
							/>
						)}
					/>
					<Controller
						control={control}
						name={'image'}
						rules={{
							required: { value: true, message: 'Image is required' },
						}}
						render={({ field, fieldState }) => (
							<>
								<Button component="label" variant="contained" startIcon={<CloudUpload />}>
									{field.value ? 'Change file' : 'Upload file'}
									<input
										hidden
										type="file"
										accept="image/*"
										onChange={async (e) => field.onChange(await toBase64(e.target.files?.[0]))}
									/>
								</Button>
								{fieldState.invalid && (
									<Typography color="error">{fieldState.error?.message}</Typography>
								)}
							</>
						)}
					/>
					<Button variant="contained" type="submit">
						Submit
					</Button>
					<Button variant="contained" onClick={() => dispatch(resetForm())} color="error">
						Clear
					</Button>
				</Stack>
			</form>
			<Button onClick={() => dispatch<any>( setFormPost('iss'))}>hahaha</Button>
		</>
	)
}

export default PostForm
