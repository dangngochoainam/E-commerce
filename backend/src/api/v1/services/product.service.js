const db = require('../models');
const _Product = db.Product

module.exports = {
    getAllProducts: async() => {
        try {
            const products = await _Product.findAll();
            return {
                code: 200,
                element: products
            }
        } catch (error) {
            console.log(error);
        }
    }
}