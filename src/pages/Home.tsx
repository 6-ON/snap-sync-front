import { Stack, Container, Grid, Skeleton } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { PostCard, PostForm } from '../components'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getPostsThunk } from '../redux/actions'
import { useTitle } from '../hooks'
const Home: FC = () => {
	useTitle('Home')
	const posts = useAppSelector((state) => state.post.posts)
	const user = useAppSelector((state) => state.user.user)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch<any>(getPostsThunk())
	}, [dispatch])
	return (
		<Stack rowGap={2} direction={{ md: 'row', xs: 'column-reverse' }} marginX={{ sm: '2rem', md: '5rem' }}>
			<Grid
				container
				justifyContent={{ md: 'flex-start', xs: 'center' }}
				sx={{ flex: 2 }}
				spacing={{ xs: 2, md: 3 }}
				columns={3}
				rowGap={3}
			>
				{posts.length
					? posts.map((post, i) => (
							<Grid item key={i} columns={2}>
								<PostCard post={post} isMine={post.creator._id === user?._id} isLiked= {user && post.likes.includes(user._id)} />
							</Grid>
					))
					: [...Array(5)].map((_, i) => (
							<Grid item key={i} columns={1}>
								<Skeleton variant="rectangular" width="300px" height={'150px'} />
								<Skeleton />
								<Skeleton width="60%" />
							</Grid>
					))}
			</Grid>

			<Container sx={{ position: 'relative', flex: 1 }}>
				<PostForm />
			</Container>
		</Stack>
	)
}

export default Home
