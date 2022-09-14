const db = require('../models');

module.exports = {
    getAllProducts: async() => {
        try {
            const products = await db.Product.findAll();
            return {
                code: 200,
                element: products
            }
        } catch (error) {
            console.log(error);
        }
    }
}