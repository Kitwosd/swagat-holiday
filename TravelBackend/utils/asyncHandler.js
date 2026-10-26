/**
 * Async handler utility to wrap asynchronous controller functions
 * and automatically forward errors to the Express error middleware.
 *
 * @param {Function} fn - Asynchronous Express route handler
 * @returns {Function} Express middleware handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
