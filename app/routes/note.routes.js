const controller = require('../controllers/note.controller.js');
const express = require("express");
const route = express.Router();
const validate = require("../middlewares/note.middleware");
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/")//destination folder name
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)//file name to be saved
    }
})
const upload = multer({ storage: fileStorageEngine })

// Create a new Note
route.post('/', controller.createNote);

// Retrieve all Notes
route.post('/getnotes', controller.findAll);

// Retrieve a single Note with noteId
route.get('/:noteId', controller.findOne);

//moving note to thrasj i.e updatinf trash field
route.put('/trash', controller.setTrash)
// route.post('/trash',controller.setTrash)


// Update a Note with noteId
route.put('/:noteId', controller.updateNote);

// Delete a Note with noteId
route.put('/', controller.deleteOne);

// update a Note with noteId
route.put('/update', controller.updateNote);

// update a Note with noteId
route.post('/updateColor',controller.updateNoteColor);

//image uploading
route.post('/uploadImage', upload.single('image'));

module.exports = route;