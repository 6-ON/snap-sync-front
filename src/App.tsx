import React from 'react'
import PostForm from './components/Post/PostForm'
import { Container, Stack } from '@mui/material'
import { useMediaQuery } from '@mui/material'

function App() {
	const isSmallScreen = useMediaQuery('(max-width: 600px)')

	return (
		<Stack direction={isSmallScreen ? 'column' : 'row'}>
			<Container sx={{ backgroundColor: 'red', flex: 2 }}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas odio possimus quis autem mollitia
				laudantium incidunt quibusdam. Quisquam vitae error libero soluta voluptatibus veritatis ad, id, optio
				placeat illum sit!
			</Container>
			<Container sx={{ position: 'relative', flex: 1 }}>
				<PostForm />
			</Container>
		</Stack>
	)
}

export default App
