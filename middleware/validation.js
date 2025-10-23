//checks whether all required fields are present in the request body for product creation or update
function validation(req, res, next) {
    const{ id, name, description, price, category, inStock } = req.body;
    if (!id || !name || !description || !price || !category || inStock === undefined) {
        return res.status(400).json({ message: 'All fields are required: id, name, description, price, category, inStock' });
    }

    // Validate data types
  if (typeof id !== 'string' && typeof id !== 'number') {
    return res.status(400).json({ message: 'id must be a string or number' });
  }

  if (typeof name !== 'string' || typeof description !== 'string' || typeof category !== 'string') {
    return res.status(400).json({ message: 'name, description, and category must be text' });
  }

  if (typeof price !== 'number') {
    return res.status(400).json({ message: 'price must be a number' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be true or false' });
  }

  // Check for empty strings
  if (name.trim() === '' || description.trim() === '' || category.trim() === '') {
    return res.status(400).json({ message: 'name, description, and category cannot be empty' });
  }

  // (Optional) Check for positive price
  if (price < 0) {
    return res.status(400).json({ message: 'price must be zero or greater than zero' });
  }

  // If everything passes, move on
  next();
}

module.exports = validation;