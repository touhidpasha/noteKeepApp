const controller = require('../controllers/user.controller');
const express = require("express");
const route = express.Router();
const middleware=require("../middlewares/user.middleware");
const multer = require('multer')

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,callback) => {
      callback(null,"uploads/")
    },
    filename:(req,file,callback) => {
      callback(null,file.originalname)
    }
  })
  
  const upload = multer({ storage: fileStorageEngine})
// const cors=require('cors')

 
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }   

    // Create a new Note
    route.post('/',controller.createUser);
    // route.post('/',middleware.validate, controller.createUser);

    //logifor user
    route.post('/login',controller.login)

    //forgot password implementation
    route.post('/forgotPassword',controller.forgotPassword)

    //OTP verification
    route.post('/verifyOTP',controller.verifyOTP)

    //link for resetting password
    route.put('/resetPassword',controller.resetPassword)

    // Retrieve all Notes
    // route.get('/',cors(corsOptions), controller.findAll);
    route.get('/', controller.findAll);


    // Retrieve a single Note with userId
    route.get('/:userId', controller.findOne);

    // Update a Note with userId
    route.put('/:userId', controller.updateUser);

    // Delete a Note with userId
    route.delete('/:userId', controller.deleteOne);

    route.post('/uploadImage',upload.single('image'),controller.uploadImage);


module.exports = route;