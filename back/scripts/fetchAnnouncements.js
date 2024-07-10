const axios = require('axios');
const xml2js = require('xml2js');
const mongoose = require('mongoose');
const Notice = require('../models/Notice');
require('../config/db');
require('dotenv').config();

const rssFeedUrl = process.env.RSS_FEED_URL;

async function fetchRSSFeed() {
  try {
    const response = await axios.get(rssFeedUrl);
    const rssData = await xml2js.parseStringPromise(response.data);
    const items = rssData.rss.channel[0].item;

    for (const item of items) {
      const notice = new Notice({
        title: item.title[0],
        content: item.description[0],
        category: item.category ? item.category[0] : 'General',
        created_at: new Date(item.pubDate[0])
      });

      await notice.save();
      console.log(`Saved notice: ${notice.title}`);
    }
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
  }
}

fetchRSSFeed().then(() => {
  console.log('RSS feed processing complete.');
  mongoose.disconnect();
}).catch((err) => {
  console.error('Error in RSS feed processing:', err);
  mongoose.disconnect();
});
