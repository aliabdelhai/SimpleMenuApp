import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    },
    allCenter: {
        margin: '10% auto',
        textAlign: 'center'
    }
}));

let isAdmin = false;

function Details(props) {
    const [spinner, setSpinner] = useState(true);


    const restaurantId = props.match.params.id;
    const urlParams = new URLSearchParams(window.location.search);
    isAdmin = urlParams.get('isAdmin');

    const getRestaurant = function (id) {
        props.restaurantsStore.loadRestaurantFromDB(id)
    }

    useEffect(() => {
        setTimeout(() => setSpinner(false), 1000)

        getRestaurant(restaurantId)
    }, [])

    const classes = useStyles();
    const currentRestaurant = props.restaurantsStore.getCurrentRestaurant;


    return (
        <div className="restaurantDetail">
            {spinner ? <div className={classes.allCenter}><CircularProgress /> </div> : <div>
                <h3 className="title">{currentRestaurant.name}</h3>
                {currentRestaurant.hasMenu ? <div className="subTitle">{currentRestaurant.menuName}</div> : <div className="subTitle">{"There is no menu"}</div>}
                <br></br>

                <Grid container direction="row" justify="space-evenly" spacing={3}>
                    {
                        currentRestaurant.menu?.map(v => (
                            <Grid item key={v._id}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia>
                                            <img alt="img" className={classes.media} src={v.img} />
                                        </CardMedia>
                                        <CardContent className={classes.textHeight}>
                                            <Typography noWrap variant="h6" component="h2" className={classes.header}>
                                                {"name: "}{v.name}
                                            </Typography>
                                            <Typography noWrap variant="h6" component="h2" className={classes.header}>
                                                {"price: "}{v.price}{' USD'}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>

                <br></br>
                {isAdmin == 'true' ? <div>
                    <center>

                        <div className={classes.btn}>
                            <Button variant="contained" color="primary"><Link className='btn' to={`/edit/${restaurantId}/admin`}>
                                EDIT </Link>
                            </Button>
                            <Button variant="contained" color="primary"><Link className='btn' to={`/add/${restaurantId}/admin`}>
                                ADD </Link>
                            </Button>
                        </div>
                    </center></div>
                    : null
                }
            </div>
            }


        </div>
    );
}

export default inject("restaurantsStore")(observer(Details))