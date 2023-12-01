import React, { FC } from 'react'
import { LayoutProps } from './types'

const EmptyLayout:FC<LayoutProps> = ({ children }) => {
	return <>
		<div>
			<h1>auth layout</h1>
			{children}
		</div>
	</>
}

export default EmptyLayout
