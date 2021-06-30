import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Restaurant from "./Restaurant";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactSnackBar from "react-js-snackbar";



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 270,
    },
    media: {
        height: 180,
        width: '100%'
    },
    textHeight: {
        height: 134
    },
    header: {
        color: '#325355'
    },
    btn: {
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}));


function Dishes(props) {

    const deleteDish = function (id) {
        props.restaurantsStore.deleteDish(id)

    }

    const [dish, setDish] = useState({
        name: props.dish.name,
        price: props.dish.price
    })
    const [sh, setSh] = useState({show: false, showing: false})


    const updateDish = (id, dish) => {
        if (sh.Showing) return;
        setSh({show: true, showing:true})
        setTimeout(() => {
          setSh({show: false, showing:false});
        }, 2000);
        props.restaurantsStore.updateDish(id, dish)
    }

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia>
                        <img alt="img" className={classes.media} src={props.dish.img} />
                    </CardMedia>
                    <CardContent className={classes.textHeight}>
                        <Typography noWrap variant="h6" component="h2" className={classes.header}>
                            {"name: "}<input placeholder={props.dish.name} value={dish.name}
                                onChange={({ target }) => setDish(state => ({ ...state, name: target.value }))}
                            />
                        </Typography>
                        <Typography noWrap variant="h6" component="h2" className={classes.header}>
                            {"price: "}<input type="text" id="fname" placeholder={props.dish.price} value={dish.price}
                                onChange={({ target }) => setDish(state => ({ ...state, price: target.value }))} name="fname" />

                        </Typography>

                    </CardContent>
                    <Button onClick={() => updateDish(props.dish._id, dish)}>
                        Submit <ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                        Your data is updated
                    </ReactSnackBar>
                    </Button>
                    <Button onClick={() => deleteDish(props.dish._id)}>
                        Delete 
                    </Button>
                </CardActionArea>
            </Card>



        </div>

    );
}

export default inject("restaurantsStore")(observer(Dishes))