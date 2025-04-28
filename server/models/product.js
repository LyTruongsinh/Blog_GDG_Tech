const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://23021410:Sl2jCrBm63EqopFA@cluster0.gq1kc.mongodb.net/Nodejs?retryWrites=true&w=majority&appName=Cluster0")
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    name_product : String,
    price_product : Number,
    desc_product : String,
    image_product : String,
}, {
    collection : "Products"
});
const ProductModel = mongoose.model("product", ProductSchema)
module.exports = ProductModel;