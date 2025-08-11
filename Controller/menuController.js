const Menu = require('../Models/Menu');
const {findByIdAndDelete} = require('../Models/User');

const getMenu = async (req, res) => {
    try{
        // Fetching all menu items from database
        const menu = await Menu.find()

        rse.status(200).json({
            success: true,
            message: menu
        })
    }
    catch (error){
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

// Create a new menu item 
const addDish = async (req, res) =>{
    try {
        const {name, price, description} = req.body;

        console.log('check')
        const dish = await Menu({name, price, description}).save()
        console.log(dish)
        res.status(201).json({
            success: true,
            message: dish
        })
    }

    catch (error) {
        res.status(500).json ({
            success: false,
            message: error.message
        })
    }
}


module.exports = {getMenu, addDish}