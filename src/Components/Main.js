import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Restaurant from "./Restaurant";
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Main(props) {
    const [withMenu, setCheck] = useState(false);
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
      };
    useEffect(() => {
        withMenu ? props.restaurantsStore.loadRestaurantsWithMenu(page) : props.restaurantsStore.loadRestaurantsFromDB(page)

    }, [page, withMenu])
    const classes = useStyles();
    
   
    return (
        <div>
            <FormControlLabel
                control={<Checkbox checked={withMenu} onChange={() => setCheck(!withMenu)} name="withMenu" />}
                label="With Menu"
            />
            <div>
                <Grid container direction="row" justify="space-evenly" spacing={6}>
                    {
                        props.restaurantsStore.getRestaurants?.map((r) => (
                            <Grid item key={r._id}>
                                <Restaurant restaurant={r} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
            <br></br><div className={classes.root}>
                <Pagination count={3} color="primary" page={page} onChange={handleChange}  />
                </div>
            <br></br> 
           
        </div>

    );
}

export default inject("restaurantsStore")(observer(Main))