import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dishes from './Dishes'
import ReactSnackBar from "react-js-snackbar";


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
    })


    const updateRestaurant = (restaurant, id) => {
        props.restaurantsStore.updateRestaurant(restaurant, id)
        if (sh.Showing) return;
        setSh({ show: true, showing: true })
        setTimeout(() => {
            setSh({ show: false, showing: false });
        }, 2000);
    }

    return (
        <div className="restaurantDetail">
            <center><br></br>
                {"Restaurant Name: "}<input className="title" placeholder={currentRestaurant.name} value={restaurant.name}
                    onChange={({ target }) => setRestaurant(state => ({ ...state, name: target.value }))}
                />
                {currentRestaurant.hasMenu ? <div><br></br>{"Menu Name: "}<input className="subTitle" placeholder={currentRestaurant.menuName} value={restaurant.menuName}
                    onChange={({ target }) => setRestaurant(state => ({ ...state, menuName: target.value }))}
                /></div> : <div className="subTitle">{"There is no menu"}</div>} </center>
            <br></br><center>
                <Button onClick={() => updateRestaurant(restaurant, restaurantId)}>
                    Submit <ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                        Your data is updated
                    </ReactSnackBar>
                </Button><br></br></center> <br></br>
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
            }
        </div>
    );
}

export default inject("restaurantsStore")(observer(Edit))