const controller = require('../controllers/label.controller');
const express = require("express");
const route = express.Router();

// Create a new Note
route.post('/', controller.createLabel);

// route.get('/',cors(corsOptions), controller.findAll);
route.get('/', controller.findAll);

// Retrieve a single Note with userId
route.get('/findOne', controller.findOne);

//link for resetting password
route.put('/', controller.updateLabel)

// Delete a Note with userId
route.delete('/', controller.deleteOne);



module.exports = route;