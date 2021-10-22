const controller = require('../controllers/note.controller.js');
const express = require("express");
const route = express.Router();
const validate=require("../middlewares/note.middleware");



 
   
    // Create a new Note
    route.post('/',validate, controller.createNote);

    // Retrieve all Notes
    route.get('/', controller.findAll);

    // Retrieve a single Note with noteId
    route.get('/:noteId', controller.findOne);

    // Update a Note with noteId
    route.put('/:noteId', controller.updateNote);

    // Delete a Note with noteId
    route.delete('/:noteId', controller.deleteOne);


module.exports = route;