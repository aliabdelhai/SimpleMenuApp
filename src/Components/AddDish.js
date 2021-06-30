
import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import "../Style/edit.css";
import ReactSnackBar from "react-js-snackbar";

function AddDish(props) {

    const [input, setInput] = useState({ name: "", price: "", img: "" })
    const [sh, setSh] = useState({ show: false, showing: false })

    const add = (input, id) => {
        if (input.name == "" || input.price == "" || input.img == "") {
            alert('please fill all required fields!')
            return;
        }
        if (sh.Showing) return;
        setSh({ show: true, showing: true })
        setTimeout(() => {
            setSh({ show: false, showing: false });
        }, 2000);
        props.restaurantsStore.addDish(input, id)
    }

    return (
        <div id="Add-dish">
            <h3>Add Dish</h3>
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

                <div className="addwrapper">Price:
                    <input
                        className="addInput"
                        type="text"
                        id="dishPrice"
                        value={input.price}
                        onChange={({ target }) => setInput(state => ({ ...state, price: target.value }))}
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
            <button id="addButton" onClick={() => add(input, props.id)}>Add New Dish
                <ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                    Your data is updated
                </ReactSnackBar>
            </button>
        </div>
    );
}

export default inject("restaurantsStore")(observer(AddDish))