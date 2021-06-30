import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		maxWidth: 230,
	},
	media: {
		height: 130,
		width: '100%'

	},
	textHeight: {
		height: 134
	},
	header: {
		color: 'green',
		cursor: 'pointer',
		textDecoration: 'none'
	}
});

export default function Restaurant(props) {
	const classes = useStyles();

	return (
		<Link to={`/details/${props.restaurant._id}`}>
			<br></br>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia>
						<img alt="img" className={classes.media} src={props.restaurant.img} />
					</CardMedia>
					<CardContent className={classes.textHeight}>
						<Typography variant="h6" component="h2" className={classes.header}>
							{props.restaurant.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
}