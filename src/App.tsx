import React from 'react'
import PostForm from './components/Post/PostForm'
import { Container, Stack, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import PostCard from './components/Post'
import { useAppSelector } from './redux/hooks'

function App() {
	const isSmallScreen = useMediaQuery('(max-width: 600px)')
	const posts = useAppSelector((state) => state.post.posts)
	return (
		<>
			<Typography variant="h1" textAlign={'center'}>snap-sync</Typography>
			<Stack direction={isSmallScreen ? 'column' : 'row'}>
				<Stack direction={'row'} sx={{ flex: 2 }} flexWrap={'wrap'} gap={'1rem'}>
					{posts.map((_, i) => (
						<PostCard key={i} />
					))}
				</Stack>
				<Container sx={{ position: 'relative', flex: 1 }}>
					<PostForm />
				</Container>
			</Stack>
		</>
	)
}

export default App
