const express = require('express')
const Restaurant = require('../models/Restaurant')
const Dish = require('../models/Dish')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send({ status: "server working" })
})

router.post('/restaurants', (req, res) => {
    if (req.query.isAdmin) {
        try {
            const restaurant = new Restaurant(req.body.restaurant);
            restaurant.save(restaurant);
            console.log()
            res.status(201).end();
        } catch (error) {
            res.status(400).send(error);
        }
    }
    else {
        res.send('only admins can edit menus')
    }
})

router.get('/restaurants', async (req, res) => {
    let filter = {}
    if (req.query.hasMenu) {
        filter = { hasMenu: true }
    }
    try{
        const restaurants = await Restaurant.find(filter)
        res.status(201).send(restaurants);
    }catch(error){
        res.status(400).send(error);
    }
    
})


router.get('/restaurants/:page', (req, res) => {
    let filter = {}
    let page = req.params.page
    if (req.query.hasMenu) {
        filter = { hasMenu: true }
    }
    Restaurant.find(filter).sort({genre: -1}).skip((page-1)*5).limit(5).populate("menu").exec(function (err, restaurants) {
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).send({ restaurants });
    })
})

router.get('/restaurant/:id', (req, res) => {
    const restaurantId = req.params.id;
    Restaurant.findOne({ _id: restaurantId }).populate("menu").exec(function (err, restaurants) {
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).send({ restaurants });
    })
})

router.post('/dishes/:restaurantId', (req, res) => {
    if (req.query.isAdmin) {
        try {
            const dish = new Dish(req.body.dish);
            dish.save();
            Restaurant.findOneAndUpdate({ _id: req.params.restaurantId }, {
                $push: {
                    menu: dish._id
                },
                hasMenu: true
            }, function (err) {
                if (err)
                    res.status(400).send(err.message);
                else
                    res.status(201).end();
            })
        } catch (error) {
            res.status(400).send(error);
        }
    }
    else {
        res.send('only admins can edit menus')
    }
})

router.put('/restaurants/:id', async (req, res) => {
    let id = req.params.id
    if (req.query.isAdmin) {
        try {
            const restaurant = await Restaurant.findOneAndUpdate({ _id: id }, { name: req.body.restaurant.name, menuName: req.body.restaurant.menuName, genre: req.body.restaurant.genre, location: req.body.restaurant.location, description: req.body.restaurant.description }, { new: true })
            res.status(201).send(restaurant)
        } catch (error) {
            res.status(400).send(error)
        }
    } else {
        res.send('only admins can edit menus')
    }
})

router.put('/dishes/:id', async (req, res) => {
    const id = req.params.id
    if (req.query.isAdmin) {
        try {
            await Dish.findOneAndUpdate({ _id: id }, { name: req.body.dish.name, price: req.body.dish.price }, { new: true })
            res.status(201).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }
    else {
        res.send('only admins can edit menus')
    }
})

router.delete('/dishes/:id', async (req, res) => {
    if (req.query.isAdmin) {
        const dishID = req.params.id
        try {
            const dish = await Dish.findOneAndDelete({ _id: dishID })
            res.status(201).send(dish)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    else {
        res.send('only admins can edit menus')
    }
})

module.exports = router