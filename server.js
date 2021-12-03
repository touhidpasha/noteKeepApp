const express = require('express');
const logger = require('./config/logger.config')
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const noteRouter = require('./app/routes/note.routes.js');
const userRouter = require('./app/routes/user.router');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cors = require('cors')
    // create express app
const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    // credentials:true,  
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use('/note', noteRouter);
app.use('/user', userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(()=>{console.log("***********bofore static fetching");},express.static('./uploads')); //static files folder
// app.use('/images', express.static('images'));//url pattern
mongoose.Promise = global.Promise;

// Connecting to the database
const dbConnect = async() => {
    try {
        await mongoose.connect(dbConfig.url, {
            useNewUrlParser: true
        });
    } catch (err) {
        console.log('Could not connect to the database. Exiting now...', err);
        logger.error("could not connect to DB");
        process.exit();
    }

    console.log("Successfully connected to the database");
    logger.info("database connected");
}

app.listen(5000, () => {
    dbConnect();
    console.log("server started");
});