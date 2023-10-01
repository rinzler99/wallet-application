// middleware/validateBalance.js

const validateBalance = (req, res, next) => {
    let { balance, amount } = req.body;
    if(!balance)
        balance = amount;
    // Convert the balance to a string and split it by '.'
    const balanceParts = balance.toString().split('.');
  
    // Check if there are more than 4 decimal places
    if (balanceParts[1] && balanceParts[1].length > 4) {
      return res.status(400).json({ error: 'Invalid balance. Maximum 4 decimal places allowed.' });
    }
  
    next(); // Proceed to the next middleware
  };
  
  module.exports = validateBalance;
  