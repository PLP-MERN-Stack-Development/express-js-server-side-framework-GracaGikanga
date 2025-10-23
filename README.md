# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 


## Example requests and responses
1.GET READ -reads all existing products

Request: http://localhost:5000/api/products

-Response:
[
{
        "_id": "68f9f168bf917954e87e239c",
        "id": "1",
        "name": "Laptop",
        "description": "High-performance laptop with 16GB RAM",
        "price": 1200,
        "category": "electronics",
        "inStock": true,
        "createdAt": "2025-10-23T09:12:08.560Z",
        "updatedAt": "2025-10-23T09:12:08.560Z",
        "__v": 0
    },
    {
        "_id": "68f9f2debf917954e87e239e",
        "id": "2",
        "name": "Smartphone",
        "description": "Latest model with 128GB storage",
        "price": 800,
        "category": "electronics",
        "inStock": true,
        "createdAt": "2025-10-23T09:18:22.625Z",
        "updatedAt": "2025-10-23T09:18:22.625Z",
        "__v": 0
    },
    {
        "_id": "68f9f319bf917954e87e23a0",
        "id": "3",
        "name": "Coffe Maker",
        "description": "Programmable coffee maker with timer",
        "price": 50,
        "category": "Kitchen",
        "inStock": false,
        "createdAt": "2025-10-23T09:19:21.354Z",
        "updatedAt": "2025-10-23T09:19:21.354Z",
        "__v": 0
    }
]

2.POST 
-Request:http://localhost:5000/api/products

-Added product:
{
    "id": 5,
    "name": "T-shirt",
    "description": "A Blue t-shirt with nikey printed on it",
    "price": 4000,
    "category": "Clothing",
    "inStock": true
  }
-Response [201 CREATED]
{
    "id": "5",
    "name": "T-shirt",
    "description": "A Blue t-shirt with nikey printed on it",
    "price": 4000,
    "category": "Clothing",
    "inStock": true,
    "_id": "68f9f70abf917954e87e23aa",
    "createdAt": "2025-10-23T09:36:10.394Z",
    "updatedAt": "2025-10-23T09:36:10.394Z",
    "__v": 0
}


3.PUT -updates a product by ID
-Request:http://localhost:5000/api/products/68f9f6abbf917954e87e23a8

-original product details (has a typo error):
{
    "id": 4,
    "name": "Electirc whisk machine",
    "description": "A whisk machine powered by elecricity",
    "price": 5000,
    "category": "Kitchen",
    "inStock": true
  }

-Response:
{
    "_id": "68f9f6abbf917954e87e23a8",
    "id": "4",
    "name": "Electric whisk machine",
    "description": "A whisk machine powered by elecricity",
    "price": 5000,
    "category": "Kitchen",
    "inStock": true,
    "createdAt": "2025-10-23T09:34:35.617Z",
    "updatedAt": "2025-10-23T10:07:25.730Z",
    "__v": 0
}

4.DELETE (WITH ID)

-Request: http://localhost:5000/api/products/68f9f70abf917954e87e23aa

-Response:[200 OK]
{
    "message": "Products deleted"
}

5.PAGINATION
-Request:http://localhost:5000/api/products?page=2&limit=1
-Response:
{
    "totalProducts": 4,
    "currentPage": 2,
    "totalPages": 4,
    "products": 
    [
        {
            "_id": "68f9f2debf917954e87e239e",
            "id": "2",
            "name": "Smartphone",
            "description": "Latest model with 128GB storage",
            "price": 800,
            "category": "electronics",
            "inStock": true,
            "createdAt": "2025-10-23T09:18:22.625Z",
            "updatedAt": "2025-10-23T09:18:22.625Z",
            "__v": 0
        }
    ]
}

6.GET (SEARCH) by id
-Request:http://localhost:5000/api/products/search?name=coffee
-Response:
[
    {
        "_id": "68f9f319bf917954e87e23a0",
        "id": "3",
        "name": "Coffee Maker",
        "description": "Programmable coffee maker with timer",
        "price": 50,
        "category": "Kitchen",
        "inStock": true,
        "createdAt": "2025-10-23T09:19:21.354Z",
        "updatedAt": "2025-10-23T09:32:53.739Z",
        "__v": 0
    }
]

7. GET (statistics)
-Request:http://localhost:5000/api/products/stats
-Response:
[
    {
        "_id": "electronics",
        "count": 2,
        "avgPrice": 1000,
        "totalPrice": 2000
    },
    {
        "_id": "Kitchen",
        "count": 2,
        "avgPrice": 2525,
        "totalPrice": 5050
    }
]
