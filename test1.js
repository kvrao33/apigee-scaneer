const winston = require('winston');

// Define your custom log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(), // Enable color coding
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Ensure colors are applied
        logFormat
      )
    })
  ]
});

// Example usage
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
