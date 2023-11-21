import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Chip, Grid } from '@mui/material/';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Delete } from '@mui/icons-material';
import { TPost } from './types';
import { useAppDispatch } from '../redux/hooks';
import { deletepost, likepost, setFormPost } from '../redux/PostReducer';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type PostCardProps = {
  post: TPost
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [showFullContent, setShowFullContent] = useState(false);

  const handleMenuClick = () => {
    dispatch<any>(setFormPost(post._id));
  };

  const like = () => {
    dispatch<any>(likepost(post._id));
  };

  const deletepst = () => {
    dispatch<any>(deletepost(post._id));
  };

  const toggleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <Card sx={{ maxWidth: 345, border: '1px solid #ddd', borderRadius: '8px' }}>
      <CardHeader
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),url("${post.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 150,
        }}
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleMenuClick()}
              color="inherit"
            >
              <MoreHorizIcon sx={{ color: 'white' }} />
            </IconButton>

          </>
        }
        title={<Typography variant="h6" sx={{ color: 'white' }}>{post.title}</Typography>}
        subheader={<Typography variant="subtitle2" sx={{ color: 'white' }}>{post.createdAt}</Typography>}
      />
      <CardContent>
        <div className="flex flex-wrap">
          {post.tags.map((tag, i) => (
            <Chip key={i} className="w-3/12" label={tag} />
          ))}
        </div>
        <Typography gutterBottom variant="h5" component="div">
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
        <Button onClick={like} startIcon={<ThumbUpIcon />}>
          Like {post.likes}
        </Button>
        <Button onClick={deletepst} startIcon={<Delete />}>
          Delete
        </Button>
      </Grid>
    </Card>
  );
};

export default PostCard;