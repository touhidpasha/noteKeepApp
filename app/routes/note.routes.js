const controller = require('../controllers/note.controller.js');
const express = require("express");
const route = express.Router();
const validate = require("../middlewares/note.middleware");

// Create a new Note
route.post('/', controller.createNote);

// Retrieve all Notes
route.post('/getnotes', controller.findAll);

// Retrieve a single Note with noteId
route.get('/:noteId', controller.findOne);

//moving note to thrasj i.e updatinf trash field
route.put('/trash',controller.setTrash)
// route.post('/trash',controller.setTrash)


// Update a Note with noteId
route.put('/:noteId', controller.updateNote);

// Delete a Note with noteId
route.put('/', controller.deleteOne);

// update a Note with noteId
route.put('/update', controller.updateNote);


module.exports = route;