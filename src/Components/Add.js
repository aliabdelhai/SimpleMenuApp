import '../Style/edit.css';
import AddRestaurant from "./AddRestaurant";
import AddDish from "./AddDish";
import { observer } from 'mobx-react'

function Add(props) {
    const restaurantId = props.match.params.id;
    return (
        <div>
            <AddDish id={restaurantId} />
            <hr></hr>
            <AddRestaurant />
        </div>
    )
}

export default observer(Add)