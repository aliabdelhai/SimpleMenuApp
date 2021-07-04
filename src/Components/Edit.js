import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dishes from './Dishes'
import ReactSnackBar from "react-js-snackbar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    btn: {
        '& > *': {
            margin: theme.spacing(1),
        }
    },

}));

function Edit(props) {
    const restaurantId = props.match.params.id;
    const [sh, setSh] = useState({ show: false, showing: false })

    const getRestaurant = async function (id) {
        props.restaurantsStore.loadRestaurantFromDB(id)
    }

    useEffect(() => {
        getRestaurant(restaurantId)
    }, [])

    const currentRestaurant = props.restaurantsStore.getCurrentRestaurant;

    const [restaurant, setRestaurant] = useState({
        name: currentRestaurant.name,
        menuName: currentRestaurant.menuName,
        genre: currentRestaurant.genre,
        location: currentRestaurant.location,
        description: currentRestaurant.description,

    })


    const updateRestaurant = (restaurant, id) => {
        props.restaurantsStore.updateRestaurant(restaurant, id)
        if (sh.Showing) return;
        setSh({ show: true, showing: true })
        setTimeout(() => {
            setSh({ show: false, showing: false });
        }, 2000);
    }
    const classes = useStyles();


    return (
        <div className="editMenu">
            <h3>Update Restaurant</h3>
            <div className='Add-item'>
                <div className="addwrapper">
                    Restaurant Name: <input className="addInput" placeholder={currentRestaurant.name} value={restaurant.name}
                        onChange={({ target }) => setRestaurant(state => ({ ...state, name: target.value }))}
                    /></div>
                <div className="addwrapper" >
                    Menu Name: <input className="addInput" placeholder={currentRestaurant.menuName} value={restaurant.menuName}
                    onChange={({ target }) => setRestaurant(state => ({ ...state, menuName: target.value }))}
                /></div>
                <div className="addwrapper">
                    Genre: <input className="addInput" placeholder={currentRestaurant.genre} value={restaurant.genre}
                        onChange={({ target }) => setRestaurant(state => ({ ...state, genre: target.value }))}
                    /></div>
                <div className="addwrapper">
                    Location: <input className="addInput" placeholder={currentRestaurant.location} value={restaurant.location}
                        onChange={({ target }) => setRestaurant(state => ({ ...state, location: target.value }))}
                    /></div>
                <div className="addwrapper">
                    Description: <input className="addInput" placeholder={currentRestaurant.description} value={restaurant.description}
                        onChange={({ target }) => setRestaurant(state => ({ ...state, description: target.value }))}
                    /></div>
            </div>

            <button id="addButton" onClick={() => updateRestaurant(restaurant, restaurantId)}>Submit
                <ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                    Your data is updated
                </ReactSnackBar>
            </button>
            <br></br><br></br>
            {currentRestaurant.hasMenu ? <div>

                <hr></hr><br></br> <center> <h3>Update Menu</h3></center>
                {

                    <Grid container direction="row" justify="space-evenly" spacing={3}>
                        {
                            currentRestaurant.menu?.map(v => (
                                <Grid item key={v._id}>
                                    <Dishes dish={v} />
                                </Grid>
                            ))
                        }
                    </Grid>
                } </div> : null}<br></br> 
                
        </div>
    );
}

export default inject("restaurantsStore")(observer(Edit))