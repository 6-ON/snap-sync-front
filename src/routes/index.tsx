import MainLayout from '../layouts/MainLayout'
import { LayoutRoute } from './layout/types'
import React from 'react'

const routes: LayoutRoute[] = [
	{
		layout: MainLayout,
		routes: [
			{
				path: '/',
				component: React.lazy(() => import('../pages/Home')),
			},
			{
				path: ['/login', '/register'],
				component: React.lazy(() => import('../pages/Auth')),
			},
		],
	},

]

export default routes
