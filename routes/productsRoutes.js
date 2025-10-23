const express = require('express');
const router = express.Router(); //pick router from express
//importing the Product model
const Products = require('../models/Products');
const validation = require('../middleware/validation'); // ✅ imports validation middleware
const Authentication = require('../middleware/Authentication'); //importing authentication middleware
const dotenv = require('dotenv');
dotenv.config();


router.use(Authentication); //use the authentication middleware (This is a global middleware)

// Root route
router.get('/api', (__, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

//CRUD operations start here (REST API)
//search products by name
// GET /api/products/search?name=keyword
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query; // Extract the search keyword from the query string

    if (!name) {
      return res.status(400).json({ message: 'Please provide a name to search.' });
    }

    // Use regex for case-insensitive partial matches
    const products = await Products.find({
      name: { $regex: name, $options: 'i' } // 'i' means case-insensitive
      // $regex is a MongoDB operator that allows for pattern matching within string fields. For example shirt can match with t-shirt or shirt dress.
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found matching your search.' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//Product statistics route
// GET /api/products/stats
router.get('/stats', async (req, res) => {
  try {
    // Aggregate products grouped by category
    const stats = await Products.aggregate([
      {
        $group: {
          _id: '$category',         // Group by category field
          count: { $sum: 1 },       // Count number of products in each category
          avgPrice: { $avg: '$price' }, //Average price per category
          totalPrice: { $sum: '$price' } //Total price per category
        }
      },
      { $sort: { count: -1 } }       // Optional: sort categories by count descending
    ]);

    if (stats.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


//pagination route
// For example: GET /api/products?page=1&limit=10
router.get('/', async (req, res) => {
  try {
     console.log('✅ Pagination route hit');
    console.log('Query params:', req.query);
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    console.log(`📄 Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

    const products = await Products.find()
      .skip(Number(skip))
      .limit(Number(limit));


    console.log('📦 Found products:', products.length);

    const totalProducts = await Products.countDocuments(); //Counts the total number of products in the collection (ignoring pagination. This helps calculate how many total pages exist


    //This sends the response back to the client as JSON.
    res.json({
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/products - Get all products
router.get ('/', Authentication,async (req, res) => {
    try {
        //gets all products from the database
        const {category} = req.query;

        let products;
        if (category) {

            products = await Products.find({ category}); //filter by category if provided

        } else {
            products = await Products.find(); //get all products if no category filter
        }

        if (products.length === 0) {
            return  res.status(404).json({ message: 'No products found' });
        }

        res.json(products); //wait for me to get the data ,if I find it I'll send it as json format.

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//GET BY ID
// GET /api/products/:id - Get a specific product by ID
router.get ('/:id', async (req, res) => {
    try {
        //gets a product by id from the database
        const products = await Products.findById(req.params.id);
        if (!products) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// POST /api/products - Create a new product
router.post ('/', validation, async (req, res) => {
    const { id, name, description, price, category, inStock } = req.body; //destructuring the data from the body

    try {
        const products = new Products({ id, name, description, price, category, inStock }); //creating a new product object
        const save = await products.save();
        res.status(201).json(save); //201 means created
    } catch (error) {
        res.status(400).json({ message: error.message }); //from frontend if there is an error
    }
});

// PUT /api/products/:id - Update a product
router.put ('/:id', async (req, res) => {
    try {
        const products = await Products.findByIdAndUpdate(
            req.params.id, //finding by id from the url
            req.body, //updating with the body data
            { new: true } //to return the updated document with the product info
        );
        res.json(products); //sending back the updated product
    } catch (error) {
        res.status(400).json({ message: error.message }); //400 means bad request
        
    }
});


//DELETE
// DELETE /api/products/:id - Delete a product
router.delete ('/:id', async (req, res) => {
    try {
        await Products.findByIdAndDelete(
            req.params.id);
        res.json({ message: 'Products deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  //500 means server error    
    }
});


//exporting the router to be used in server.js
module.exports = router;