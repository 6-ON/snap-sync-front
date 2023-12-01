import { RouteProps } from 'react-router-dom'
import { LayoutProps } from '../../../layouts/types'

export type Route = { isPrivate?: boolean; } & RouteProps

export type LayoutRoute = {
	layout: React.FC<LayoutProps>
	routes: Route[]
}
