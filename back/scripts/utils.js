const axios = require('axios');
const cheerio = require('cheerio');

// Fetch page content
const fetchPage = async (url) => {
  const response = await axios.get(url);
  return cheerio.load(response.data);
};

// Clean content (remove unwanted tags, etc.)
const cleanContent = ($, contentElement) => {
  contentElement.find('script, style, img').remove();
};

module.exports = {
  fetchPage,
  cleanContent,
};
