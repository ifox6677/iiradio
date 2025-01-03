import xml2js from 'react-native-xml2js';

// Function to parse RSS XML string to JavaScript object
export const parseRssXml = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('RSS parsing error:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Function to fetch and parse RSS feed from URL
export const fetchRssData = async (rssUrl) => {
  try {
    const response = await fetch(rssUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xml = await response.text();
    const result = await parseRssXml(xml);
    return result;
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    throw error;
  }
};

// Function to transform RSS data to HTML format
export const transformRssDataToHtml = (rssData) => {
  if (!rssData) return '';
  const items = rssData.rss.channel.item || [];
  let htmlContent = '<h1>RSS Feed</h1><ul>';
  items.forEach(item => {
    htmlContent += `<li><a href="${item.link}">${item.title}</a><p>${item.description}</p></li>`;
  });
  htmlContent += '</ul>';
  return htmlContent;
};
