const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(), // Use a simple JSON format
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log
    new winston.transports.File({ filename: 'combined.log' }), // Log all info and above to combined.log
  ],
});

if (process.env.NODE_ENV !== 'production') {
  // Only log to the console in non-production environments
  logger.add(new winston.transports.Console({
    format: winston.format.simple(), // Use simple format for console logs
  }));
}

module.exports = logger;
