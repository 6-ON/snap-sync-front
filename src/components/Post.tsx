import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Avatar, Button, Chip, Grid, Menu, MenuItem } from '@mui/material/';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Delete } from '@mui/icons-material';

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
export default function PostCard() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345, border: '1px solid #ddd', borderRadius: '8px' }}>
      <CardHeader
        sx={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),url("https://picsum.photos/200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 150,
        }}
        // avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <MoreHorizIcon sx={{ color: 'white' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Menu>
          </>
        }
        title={<Typography variant="h6" sx={{ color: 'white' }}>Shrimp and Chorizo Paella</Typography>}
        subheader={<Typography variant="subtitle2" sx={{ color: 'white' }}>September 14, 2016</Typography>}
      />
      <CardContent>
        <Chip label="Chip Filled" />
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <Grid container justifyContent="space-between" sx={{ padding: '10px 8px' }}>
        <Button startIcon={<ThumbUpIcon />}>Like 0</Button>
        <Button startIcon={<Delete />}>Delete</Button>
      </Grid>
    </Card>
  );
}
