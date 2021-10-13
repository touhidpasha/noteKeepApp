const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint,json } = format; 

let errorLogFileName =  new Date().toLocaleDateString()+'_error.log';
let combinedLogFileName =  new Date().toLocaleDateString()+'_combined.log';

const logger = createLogger({
  level: 'info',
  format: combine(
    json(),
    timestamp({format:"DD-MM-YYYY, HH:mm:ss"}) ,
    prettyPrint()
  ),
  transports: [
    new transports.File({ filename: `./loggs/${errorLogFileName}`, level: 'error' }),
    new transports.File({ filename: `./loggs/${combinedLogFileName}` }),
  ],
});

module.exports = logger;