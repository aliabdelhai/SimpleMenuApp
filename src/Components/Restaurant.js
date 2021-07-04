import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';


const useStyles = makeStyles((theme) => ({
	root: {
	  maxWidth: 345,
	},
	media: {
	  height: 0,
	  paddingTop: '56.25%', 
	},
	expand: {
	  transform: 'rotate(0deg)',
	  marginLeft: 'auto',
	  transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	  }),
	},
	expandOpen: {
	  transform: 'rotate(180deg)',
	},
	avatar: {
	  backgroundColor: red[500],
	},
  }));
  

export default function Restaurant(props) {

	const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

	return (


		<Card className={classes.root}>
		
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <RestaurantIcon> </RestaurantIcon>
          </Avatar>
        }
        action={
          <IconButton >
             <RestaurantMenuIcon> </RestaurantMenuIcon>
          </IconButton>
        }
        title={props.restaurant.name}
        subheader={props.restaurant.genre}
      />
	  <Link to={`/details/${props.restaurant._id}`}>
      <CardMedia
        className={classes.media}
        image={props.restaurant.img}
        title="Paella dish"
      />
	  </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
		{props.restaurant.location}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>About the restaurant:</Typography>
          <Typography paragraph>
		  {props.restaurant.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    

	
	);
}