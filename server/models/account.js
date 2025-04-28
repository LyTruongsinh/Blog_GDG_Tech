const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://23021410:Sl2jCrBm63EqopFA@cluster0.gq1kc.mongodb.net/Nodejs?retryWrites=true&w=majority&appName=Cluster0');
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    jobs : String,
    address: String,
    phone: String,
    username: String,
    password: String,
    email: String,
    image: {
        type: String,
        require: false
    }
}, {
    collection: 'Accounts',
})
const AccountModel = mongoose.model('account', AccountSchema);
module.exports = AccountModel;

