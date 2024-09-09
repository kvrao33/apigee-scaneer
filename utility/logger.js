const expressContext = require('@niveus/express-context');
const { config } = require('@niveus/winston-utils');
const winston = require('winston');
const { combine, json, errors, timestamp, colorize } = winston.format;
const { google } = config;

// Custom format to include context information from expressContext
const contextLogs = winston.format((info) => {
  const keyNames = ['reqid', 'reqPath']; // Set by the middleware. It is configurable.
  const [requestId, reqPath] = expressContext.getMany(keyNames);

  info = { ...info, ...{ requestId, reqPath } };

  return info;
})();

// Create a logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'error', // Default to 'error' level if not specified
  levels: google.levels,
  format: combine(
    errors({ stack: true }), // Include stack traces for errors
    timestamp(), // Add timestamp to logs// Include request context
    json() // Log in JSON format
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // Colorize all log levels
        json() // JSON format for console output
      )
    })
  ]
});

// Add colors for different log levels
winston.addColors(google.colors);

// Export the logger
module.exports = logger;
