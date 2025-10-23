function Authentication(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query['x-api-key'];

  console.log('==============================');
  console.log('Header/query key received:', apiKey);
  console.log('Server key from .env:', process.env.API_KEY);
  console.log('==============================');

  if (apiKey !== process.env.API_KEY) {
    console.log('❌ Keys do not match. Unauthorized.');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log('✅ Keys match! Authorized.');
  next();
}

module.exports = Authentication;
