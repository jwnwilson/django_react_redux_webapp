const express = require('express');
const app = express();

app.get('/', function (req, res) {
  const puppeteer = require('puppeteer');
  (async() => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(req.query.url, {waitUntil: 'networkidle2'});
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