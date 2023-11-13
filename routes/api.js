// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');

// const authenticateToken = require('../middleware/authenticateToken');
// const authorizeRoles = require('../middleware/authorizeRoles');

// // Protected route requiring 'admin' role
// router.get('/admin', authenticateToken, authorizeRoles(['admin']), (req, res) => {
//     res.json({ message: 'Admin access granted' });
//   });
  
//   // Protected route requiring 'user' role
//   router.get('/user', authenticateToken, authorizeRoles(['user']), (req, res) => {
//     res.json({ message: 'User access granted' });
//   });

  
//   module.exports = router;