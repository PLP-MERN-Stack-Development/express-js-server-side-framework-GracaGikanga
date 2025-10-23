//Schema creation for Products
const mongoose = require('mongoose');

//define schema (rules to follow to create collections/tables)
//how it is goinf to look like
//Creation of the model "Products"
const productsSchema = new mongoose.Schema({
    id: { type:String, unique:true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true }
}, { timestamps: true });


//creating the model that becomes the collection
const Products = mongoose.model('Products', productsSchema); // tying the database to the mongoose collection

//exporting the model so that it can be used in other files
module.exports = Products;