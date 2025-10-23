//- Create a custom logger middleware that logs the request method, URL, and timestamp
// - Request logging
function logger (req, res, next) {
  const time = new Date().toISOString(); // current time
  console.log(`[${time}] ${req.method} ${req.url}`);
  next(); // move to the next middleware or route

}
module.exports = logger;

