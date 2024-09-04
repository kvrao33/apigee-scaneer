import open from "open";

const openBrowser = async (url) => {
  try {
    // Try to open Chrome
    await open(url, { app: "chrome" });
  } catch (error) {
    console.log("Chrome not found, opening in the default browser.");
    // Fallback to the default browser if Chrome is not available
    await open(url);
  }
};

export default openBrowser;
