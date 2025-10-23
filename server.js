// server.js - Starter Express server for Week 2 assignment
require('dotenv').config();
console.log('Loaded API key:', process.env.API_KEY);

// Import required modules
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//This line imports the UUID library, specifically the version 4 function, which generates random unique IDs
const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');

//middleware
const connectDB = require('./config/db');
const logger = require('./middleware/logger'); //importing logger middleware
const Authentication = require('./middleware/Authentication'); //importing authentication middleware
const PORT = process.env.PORT || 5000;


dotenv.config();
//connect to database
connectDB();


//middleware : parse JSON
app.use(express.json()); //to parse json data

// Middleware setup
app.use(bodyParser.json());

app.use(logger); //use the logger middleware (This is a global middleware)
//Routes
app.use(Authentication); //use the authentication middleware (This is a global middleware)


app.use('/api/products', require('./routes/productsRoutes')); //if the route starts with /products use the productsRoutes



// Example route implementation for GET /api/products
//Specifically for server.js
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
]
app.get('/api/products', (req, res) => {
  res.json(products);
});


//middleware
// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Products Home Page! Go to /api/products to see all products.');
});


// Export the app for testing purposes
module.exports = app; 

//set the port
app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`));
