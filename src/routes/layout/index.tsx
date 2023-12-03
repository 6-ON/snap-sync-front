import { FC, Suspense, useEffect } from 'react'
import { LayoutRoute } from './types'
import { Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import nprogres from 'nprogress'

const Loader = () => {
	useEffect(() => {
		nprogres.start()
		return () => {
			nprogres.done()
		}
	}, [])
	return <></>
}

const Layout: FC<LayoutRoute> = ({ layout: LayoutComponent, routes }) => {
	// const paths = routes.map(({ path }) => path)
	return (
		<Suspense fallback={<Loader />}>
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
