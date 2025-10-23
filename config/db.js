//connections to mongodb

const mongoose = require ('mongoose');
require ('dotenv').config(); //to access the env file
const connectDB = async () =>  {
    try {

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
console.log ('MONGODB CONNECTED SUCCESSFULLY............')
    } catch (error) {
        console.error(error.message);
        process.exit (1) //exits MONGODB
    }
}
module.exports = connectDB;