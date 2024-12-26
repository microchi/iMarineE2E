const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const puppeteer = require('puppeteer');
const https = require('https');
const { promises } = require('dns');
const cliProgress = require('cli-progress');

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const checkLinkByAxios = (link) =>
  axios
    .get(link.url, {
      httpsAgent,
      headers: { Accept: '*/*', 'User-Agent': 'Thunder Client (https://www.thunderclient.com)' },
    })
    .then((o) => {
      console.log(` OK!${link.name}`);
      progressBar.increment();
      return o.status === 200 ? null : link;
    })
    .catch(() => {
      return link;
    });

const checkLinksInCSV = (filePath) => {
  const links = [];

  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => links.push({ name: Object.values(row)[0], url: Object.values(row)[1] }))
      .on('end', async () => {
        progressBar.start(links.length, 0);
        resolve((await Promise.all(links.map((link) => checkLinkByAxios(link)))).filter((link) => link));
      });
  });
};

checkLinksInCSV('iMarineLink.csv').then(async (o) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const result = [];

  for (let i = 0; i < o.length; i++) {
    const page = await browser.newPage();
    try {
      await page.goto(o[i].url, { waitUntil: 'networkidle2' });
      console.log(` OK!${o[i].name}`);
    } catch (err) {
      o[i].err = err;
      result.push(o[i]);
    } finally {
      progressBar.increment();
      await page.close();
    }
  }

  await browser.close();
  progressBar.stop();

  console.log(`檢查完畢 ${result.length === 0 ? '沒有錯誤連結' : '有' + result.length + '個錯誤連結'}`);

  result.forEach((link) => {
    console.log(`${link.url}\t${link.name}\t${link.err}`);
  });
});
