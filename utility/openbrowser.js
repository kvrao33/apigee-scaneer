const logger = require('./logger.js');

const openBrowser = async (url) => {
  try {
    // Dynamically import the `open` module
    const { default: open } = await import('open');
    // Try to open Chrome using 'google-chrome'
    await open(url, { app: { name: 'google-chrome' } });
    logger.info("Chrome Found.");
  } catch (error) {
    logger.info("Chrome not found, opening in the default browser.");
    try {
      // Fallback to the default browser if Chrome is not available
      const { default: open } = await import('open');
      await open(url);
    } catch (fallbackError) {
      logger.error("Failed to open the URL in any browser:"+ fallbackError);
    }
  }
};


module.exports = openBrowser;
