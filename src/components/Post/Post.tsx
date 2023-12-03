import { FC, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Button, Chip, Grid } from '@mui/material'
import { Delete, ThumbUp, ThumbUpOutlined, MoreHoriz } from '@mui/icons-material'
import { TPost } from '../../types'
import { useAppDispatch } from '../../redux/hooks'
import { deletePostThunk, likePostThunk, setFormPostThunk } from '../../redux/actions'
import ReactTimeAgo from 'react-time-ago'

type PostCardProps = {
	post: TPost
	isMine: boolean
	isLiked: boolean | null
}

const PostCard: FC<PostCardProps> = ({ post, isMine, isLiked }) => {
	const dispatch = useAppDispatch()
	const [showFullContent, setShowFullContent] = useState(false)

	const handleMenuClick = () => dispatch<any>(setFormPostThunk(post._id))

	const like = () => dispatch<any>(likePostThunk(post._id, isLiked!))

	const deletepst = () => dispatch<any>(deletePostThunk(post._id))

	const toggleShowFullContent = () => setShowFullContent(!showFullContent)

	return (
		<Card sx={{ maxWidth: 300, minWidth: 300 ,borderRadius:"1rem"}}>
			<CardHeader
				sx={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),url("${post.image}")`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: 150,
				}}
				action={
					<>
						{isMine && (
							<IconButton onClick={() => handleMenuClick()} color="inherit">
								<MoreHoriz sx={{ color: 'white' }} />
							</IconButton>
						)}
					</>
				}
				title={
					<>
						<Typography variant="h6" sx={{ color: 'white' }}>
							{post.title}
						</Typography>
						<Typography variant="caption" sx={{ color: 'white' }}>
							{post.creator.name}
						</Typography>
					</>
				}
				subheader={
					<Typography variant="subtitle2" sx={{ color: 'white' }}>
						<ReactTimeAgo date={new Date(post.createdAt).getTime() || 0} />
					</Typography>
				}
			/>
			<CardContent>
				<div className="flex gap-2 flex-wrap">
					{post.tags.map((tag, i) => (
						<Chip key={i} className="w-3/12" label={tag} />
					))}
				</div>
				<Typography gutterBottom variant="h5" component="h5">
					{post.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{showFullContent ? post.content : `${post.content.slice(0, 100)}...`}
					<Button onClick={toggleShowFullContent} color="primary" size="small">
						{showFullContent ? 'Show less' : 'Show More'}
					</Button>
				</Typography>
			</CardContent>
			<Grid container justifyContent="space-between" sx={{ padding: '10px 8px' }}>
				<Button
					disabled={isLiked === null}
					onClick={like}
					startIcon={isLiked ? <ThumbUp></ThumbUp> : <ThumbUpOutlined />}
				>
					Like {post.likes.length}
				</Button>
				{isMine && (
					<Button color="error"  onClick={deletepst} startIcon={<Delete />}>
						Delete
					</Button>
				)}
			</Grid>
		</Card>
	)
}

export default PostCard
