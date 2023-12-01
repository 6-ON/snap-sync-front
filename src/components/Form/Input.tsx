import { TextField } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'


type Props = {
	label: string
	type?: React.HTMLInputTypeAttribute
	name: string
	control: Control<any>
}

export const Input = ({ label,type, ...props }: Props) => {
	return (
		<Controller
			{...props}
			render={({ field, fieldState }) => (
				<TextField
                    {...field}
					label={label}
					type={type || "text"}
					fullWidth
					margin='normal'
					error={fieldState.invalid}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	)
}