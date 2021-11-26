const controller = require('../controllers/user.controller');
const express = require("express");
const route = express.Router();
const middleware = require("../middlewares/user.middleware");
// Create a new Note
route.post('/', controller.createUser);
// route.post('/',middleware.validate, controller.createUser);

//logifor user
route.post('/login', controller.login)
// route.post('/login', controller.login)

//forgot password implementation
route.put('/forgotPassword', controller.forgotPassword)

//OTP verification
route.post('/verifyOTP', controller.verifyOTP)

//link for resetting password
route.put('/resetPassword', controller.resetPassword)

// Retrieve all Notes
// route.get('/',cors(corsOptions), controller.findAll);
route.get('/', controller.findAll);

// Retrieve a single Note with userId
route.get('/:userId', controller.findOne);

// Delete a Note with userId
route.delete('/:userId', controller.deleteOne);

module.exports = route;