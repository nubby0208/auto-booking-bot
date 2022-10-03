const puppeteer = require('puppeteer');
const captcha = require('./anticaptcha/voice_anticaptcha');

const URL = "https://driveonlantau1.td.gov.hk/lcrp/application/application.do?method=readDeclaration";

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--no-sandbox',
            '--disable-features=IsolateOrigins,site-per-process',
            '--incognito']
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(URL);
    
    console.time("reCAPTCHA");
    await captcha(page);
    console.timeEnd("reCAPTCHA");

    await browser.close();
})();