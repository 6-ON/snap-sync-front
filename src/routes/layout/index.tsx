import { FC, Suspense } from 'react'
import { LayoutRoute } from './types'
import { Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import { Backdrop, CircularProgress } from '@mui/material'

const Loader = (
	<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
		<CircularProgress color="inherit" />
	</Backdrop>
)

const Layout: FC<LayoutRoute> = ({ layout: LayoutComponent, routes }) => {
	const paths = routes.map(({ path }) => path)
	return (
		<Suspense fallback={Loader}>
			<LayoutComponent>
				{routes.map(({ isPrivate, ...props }) =>
					isPrivate ? (
						<PrivateRoute exact key={props.path as any} {...props} />
					) : (
						<Route exact key={props.path as any} {...props} />
					)
				)}
			</LayoutComponent>
		</Suspense>
	)
}

export default Layout
