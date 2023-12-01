import React from 'react'
import { Redirect, RouteProps } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
	const isAuth = false
	console.log('isAuth', isAuth);
	
	return isAuth ? <>{children}</> : <Redirect to="/login" />
}

export default PrivateRoute
