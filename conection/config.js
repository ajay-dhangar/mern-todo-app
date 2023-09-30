const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGO_URI;

function ConnectDb() {
    mongoose.connect(mongoURI, {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log('connected to Database');
    })
    .catch((error)=>{
        console.log(error);
    })
}

module.exports = ConnectDb