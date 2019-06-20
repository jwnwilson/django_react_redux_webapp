const express = require('express');
const app = express();

app.get('/', function (req, res) {
  const puppeteer = require('puppeteer');
  (async() => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    // enable request interception
    await page.setRequestInterception(true);
    // add header for the navigation requests
    page.on('request', request => {
      // Do nothing in case of non-navigation requests.
      if (!request.isNavigationRequest()) {
        request.continue();
        return;
      }
      // Add a new header for navigation request.
      const headers = request.headers();
      headers['puppeteer'] = 1;
      request.continue({ headers });
    });
    await page.goto(req.query.url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    const html = await page.evaluate(() => {
        return document.documentElement.innerHTML;
    });
    browser.close();
    res.send(html);
  })();
})

app.listen(5000, function () {
    console.log("Server side render listening on port: 5000")
})