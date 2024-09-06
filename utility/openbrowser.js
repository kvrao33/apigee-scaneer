const openBrowser = async (url) => {
  try {
    // Dynamically import the `open` module
    const { default: open } = await import('open');
    // Try to open Chrome using 'google-chrome'
    await open(url, { app: { name: 'google-chrome' } });
    console.log("Chrome Found.");
  } catch (error) {
    console.log("Chrome not found, opening in the default browser.");
    try {
      // Fallback to the default browser if Chrome is not available
      const { default: open } = await import('open');
      await open(url);
    } catch (fallbackError) {
      console.error("Failed to open the URL in any browser:", fallbackError);
    }
  }
};


module.exports = openBrowser;
