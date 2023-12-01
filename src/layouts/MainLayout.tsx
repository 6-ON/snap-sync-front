import { FC } from 'react'
import { LayoutProps } from './types'
import { Link } from 'react-router-dom'
import { Paper, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../redux/actions'

const MainLayout: FC<LayoutProps> = ({ children }) => {
	const user = useAppSelector((state) => state.user.user)
	const dispatch = useAppDispatch()
	
	return (
		<>
			<div className="flex justify-center items-center my-8 px-8 h-24">
				<Paper
					elevation={5}
					sx={{
						width: '100%',
						height: '100%',
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
					}}
				>
					<Link to="/" className="text-5xl font-semibold text-cyan-500">
						SnapSync
					</Link>
					{!user ? (
						<Link to="/login">
							<Button variant="contained" color="success" sx={{ mr: 'auto' }}>
								Login
							</Button>
						</Link>
					) : (
						<Button onClick={()=> {dispatch<any>(logout())}} variant="contained" color="success" sx={{ mr: 'auto' }}>
							Logout
						</Button>
					)}
				</Paper>
			</div>
			{children}
		</>
	)
}

export default MainLayout
