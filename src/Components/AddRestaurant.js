import React, { useState, useEffect } from "react";
import "../Style/edit.css";
import { observer, inject } from 'mobx-react'
import ReactSnackBar from "react-js-snackbar";

function AddRestaurant(props) {

    const [input, setInput] = useState({ name: "", menuName: "", img: "" })
    const [sh, setSh] = useState({ show: false, showing: false })
    
    const add = (input) => {
        if (input.name == "" || input.menuName == "" || input.img == "") {
            alert('please fill all required fields!')
            return;
        }
        if (sh.Showing) return;
        setSh({ show: true, showing: true })
        setTimeout(() => {
            setSh({ show: false, showing: false });
        }, 2000);
        props.restaurantsStore.addRestaurant(input)
    }

    return (
        <div id="Add-resturant">
            <h3>Add Restaurant</h3>
            <div id="Add-item">
                <div className="addwrapper" >
                    Name:
                    <input
                        className="addInput"
                        type="text"
                        id="name"
                        value={input.name}
                        onChange={({ target }) => setInput(state => ({ ...state, name: target.value }))}
                    /> </div>

                <div className="addwrapper">menuName:
                    <input
                        className="addInput"
                        type="text"
                        id="menuName"
                        value={input.menuName}
                        onChange={({ target }) => setInput(state => ({ ...state, menuName: target.value }))}
                    /></div>

                <div className="addwrapper">image:
                    <input
                        className="addInput"
                        type="text"
                        id="img"
                        value={input.img}
                        onChange={({ target }) => setInput(state => ({ ...state, img: target.value }))}
                    /></div>
            </div>
            <button id="addButton" onClick={() => add(input)}>Add New Restaurant
                <ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                    Your data is updated
                </ReactSnackBar>
            </button>
        </div>
    );
}


export default inject("restaurantsStore")(observer(AddRestaurant))
