const express = require('express');
// const bodyParser = require('body-parser');
const logger = require('./config/logger.config')
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const noteRouter=require('./app/routes/note.routes.js');
const userRouter=require('./app/routes/user.router');
const swaggerUi=require('swagger-ui-express')
const swaggerJsDoc=require('swagger-jsdoc')
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse requests of content-type - application/json
// app.use(bodyParser.json())

//swagger docs
const swaggerOptions={
    swaggerDefinition:{
        info:{
            title:"noteKeepApp API",
            servers:['http://localhost:3000']
        }
    },
    // apis:["server.js"]
    apis:['./app/routes/note.routes.js']
}
const swaggerDocs=swaggerJsDoc(swaggerOptions) //documention object

// Configuring the database

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
// app.use('/note',noteRouter);
// app.use('/user',userRouter);
// app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swagerDocs))
noteRouter.use('/note', swaggerUi.serve);
noteRouter.get('/note', swaggerUi.setup(swaggerDocs));

mongoose.Promise = global.Promise;

// Connecting to the database
const dbConnect= async ()=>{
    try {
        await mongoose.connect(dbConfig.url,{
        useNewUrlParser: true}
        );
    }
    catch (err) {
        console.log('Could not connect to the database. Exiting now...', err);
        logger.error("could not connect to DB");
        process.exit();
    }

    console.log("Successfully connected to the database");
    logger.info("database connected");
}

app.listen(3000,()=>{
    dbConnect();
    console.log("server started");});


// const dbConnect=()=>{
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
//     logger.info("database connected");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     logger.error("could not connect to DB");
//     process.exit();
// });
// }
// define a simple route
// app.get('/', (req, res) => {
//     res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
// });

// Require Notes routes
// require('./app/routes/note.routes.js')(app);

// listen for requests
