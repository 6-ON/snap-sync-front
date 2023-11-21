import React, { useEffect } from 'react'
import PostForm from './components/Post/PostForm'
import { Container, Stack, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import PostCard from './components/Post'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { getposts } from './redux/PostReducer'
import { AnyAction } from 'redux'

function App() {
	const isSmallScreen = useMediaQuery('(max-width: 600px)')
	const posts = useAppSelector((state) => state.post.posts)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch<any>(getposts())
	}, [])
	return (
		<>
			<div className="flex justify-center my-8">

				<div className='w-10/12 py-4 flex justify-center align-middle rounded shadow-[0px_2px_5px_1px] shadow-[#ccc]'>
					<h2 className='text-5xl font-semibold text-cyan-500'>SnapSync</h2>
				</div>
			</div>
			<Stack direction={isSmallScreen ? 'column' : 'row'}>
				<Stack className='mx-10' direction={'row'} sx={{ flex: 2 }} flexWrap={'wrap'} gap={'1rem'}>
					{posts.map((post, i) => (
						<PostCard post={post} key={i} />
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
