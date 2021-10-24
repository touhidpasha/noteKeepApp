const controller = require('../controllers/user.controller');
const express = require("express");
const route = express.Router();
const validate=require("../middlewares/user.middleware");

 
   
    // Create a new Note
    // route.post('/',validate, controller.createUser);
    route.post('/',validate, controller.createUser);

    //logifor user
    route.post('/login',controller.login)

    // Retrieve all Notes
    route.get('/', controller.findAll);

    // Retrieve a single Note with emailId
    route.get('/:emailId', controller.findOne);

    // Update a Note with emailId
    route.put('/:emailId', controller.updateUser);

    // Delete a Note with emailId
    route.delete('/:emailId', controller.deleteOne);


module.exports = route;