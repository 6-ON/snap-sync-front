import { FC } from 'react'
import { LayoutProps } from './types'
import { Link } from 'react-router-dom'
import { Paper, Button, Stack, Avatar, Typography } from '@mui/material'
import { useAppDispatch } from '../redux/hooks'
import { logout } from '../redux/actions'
import { useUser } from '../hooks/useUser'

const MainLayout: FC<LayoutProps> = ({ children }) => {
	const user = useUser()
	const dispatch = useAppDispatch()

	return (
		<>
			<div className="flex justify-center items-center my-8 px-8 ">
				<Paper
					elevation={5}
					sx={{
						flexDirection: { xs: 'column', md: 'row' },
						borderRadius: '1rem',
						padding: '1rem',
						width: '100%',
						height: '100%',
						textAlign: 'center',
						justifyContent: 'space-between',
						alignItems: 'center',
						display: 'flex',
					}}
				>
					<Link to="/" className="text-5xl font-semibold text-cyan-500">
						SnapSync
					</Link>
					{!user ? (
						<Link to="/login">
							<Button variant="contained" color="success">
								Login
							</Button>
						</Link>
					) : (
						<Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
							<Stack direction={{ xs: 'column', md: 'row' }} alignItems={'center'} gap={2}>
								<Avatar src={user?.image}>{user.name.substring(0, 1)}</Avatar>
								<Typography variant="h6">{user?.name}</Typography>
							</Stack>
							<Button
								onClick={() => {
									dispatch<any>(logout())
								}}
								variant="contained"
								color="error"
							>
								Logout
							</Button>
						</Stack>
					)}
				</Paper>
			</div>
			{children}
		</>
	)
}

export default MainLayout
