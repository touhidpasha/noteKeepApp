const controller = require('../controllers/user.controller');
const express = require("express");
const route = express.Router();
const validate=require("../middlewares/user.middleware");

 
   
    // Create a new Note
    route.post('/',validate, controller.createUser);

    // Retrieve all Notes
    route.get('/', controller.findAll);

    // Retrieve a single Note with userId
    route.get('/:userId', controller.findOne);

    // Update a Note with userId
    route.put('/:userId', controller.updateUser);

    // Delete a Note with userId
    route.delete('/:userId', controller.deleteOne);


module.exports = route;