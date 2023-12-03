import React from 'react'
import { Redirect, RouteProps } from 'react-router-dom'
import { useUser } from '../hooks'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
	const isAuth = useUser()
	
	return isAuth ? <>{children}</> : <Redirect to="/login" />
}

export default PrivateRoute
