import { observable, action, makeObservable, computed } from 'mobx'
import axios from "axios";

export default class RestaurantsStore {
    constructor() {
        this.currentRestaurant = {}
        this.restaurants = []
        this.length = 0;
        makeObservable(this, {
            restaurants: observable,
            length: observable,
            currentRestaurant: observable,
            restaurantsLength: action,
            restaurantsWithMenuLength: action,
            getCurrentRestaurant: computed,
            getLength: computed,
            loadRestaurantFromDB: action,
            addRestaurant: action,
            addDish: action,
            updateDish: action,
            updateRestaurant: action,
            getRestaurants: computed,
            loadRestaurantsFromDB: action,
            loadRestaurantsWithMenu: action,
            deleteDish: action
        })
    }

    async addRestaurant(input) {
        const restaurant = {
            restaurant: {
                name: input.name, menuName: input.menuName, img: input.img, menu: [], hasMenu: false, genre: input.genre, location: input.location, description: input.description
            }
        }
        await axios.post("/restaurants/?isAdmin=true", restaurant)
    }

    async addDish(input, id) {
        const dish = {
            dish: {
                name: input.name, price: input.price, img: input.img
            }
        }
        await axios.post(`/dishes/${id}/?isAdmin=true`, dish)
    }

    updateRestaurant = async (restaurant, restaurantId) => {
        await axios.put(`/restaurants/${restaurantId}/?isAdmin=true`, { restaurant });
    }


    updateDish = async (id, dish) => {
        await axios.put(`/dishes/${id}/?isAdmin=true`, { dish });
    }

    async deleteDish(id) {
        await axios.delete(`/dishes/${id}/?isAdmin=true`)
        const index = this.currentRestaurant.menu?.findIndex(d => d._id === id)
        if (index !== -1) this.currentRestaurant.menu.splice(index, 1);

    }

    get getLength(){
        return this.length
    }

    async restaurantsLength() {
        const restaurants = await axios.get(`/restaurants`)
        this.length = restaurants.data.length;
    }

    async restaurantsWithMenuLength() {
        const restaurants = await axios.get(`/restaurants/?hasMenu=true`)
        this.length = restaurants.data.length;
    }

    get getCurrentRestaurant() {
        return this.currentRestaurant;
    }

    get getRestaurants() {
        return this.restaurants
    }

    async loadRestaurantFromDB(restaurantId) {
        const result = await axios.get(`/restaurant/${restaurantId}`)
        this.currentRestaurant = result.data.restaurants;
        console.log(this.currentRestaurant.length)
    }

    async loadRestaurantsFromDB(page) {
        let res = await axios.get(`/restaurants/${page}`)
        this.restaurants = res.data.restaurants
    }

    async loadRestaurantsWithMenu(page) {
        let res = await axios.get(`restaurants/${page}/?hasMenu=true`)
        this.restaurants = res.data.restaurants
    }
}