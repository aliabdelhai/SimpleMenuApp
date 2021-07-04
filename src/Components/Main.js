import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Restaurant from "./Restaurant";
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
    allCenter: {
        margin: '10% auto',
        textAlign: 'center'
    }

}));

function Main(props) {
    const [withMenu, setCheck] = useState(false);
    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };
    const [spinner, setSpinner] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 500)
        setTimeout(() => setLoading(true), 1200)
        withMenu ? props.restaurantsStore.loadRestaurantsWithMenu(page) : props.restaurantsStore.loadRestaurantsFromDB(page)
        withMenu ? props.restaurantsStore.restaurantsWithMenuLength() : props.restaurantsStore.restaurantsLength()

    }, [page, withMenu])
    const classes = useStyles();

    let numOfPages = Math.ceil(props.restaurantsStore.getLength / 5)
 

    return (
        <div>
            <h3 className="title">Restaurants</h3>
            <div className="subTitle">
                <FormControlLabel 
                    control={<Checkbox checked={withMenu} onChange={() => setCheck(!withMenu)} name="withMenu" />}
                    label="With Menu"
                />
            </div>
            {spinner ? <div className={classes.allCenter}><CircularProgress /> </div> : 

            <div className='results'>
                <Grid container direction="row" justify="space-evenly" spacing={8}>
                    {
                        props.restaurantsStore.getRestaurants?.map((r) => (
                            <Grid item key={r._id}>
                                <Restaurant restaurant={r} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        }
            <div className={classes.root}>
                {loading ? 
                <Pagination style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} id='pages' count={numOfPages} color="primary" page={page} onChange={handleChange} />
                : null}
            </div> 
            <br></br>
        </div>

    );
}

export default inject("restaurantsStore")(observer(Main))