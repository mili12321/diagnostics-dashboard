/**
 * @jest-environment node
 */
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

let browser;
let page;

describe('FusionTrend Tooltip Snapshot', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('shows tooltip on hover over data point', async () => {
    const canvas = await page.$('canvas');
    if (!canvas) throw new Error('Canvas not found');

    const box = await canvas.boundingBox();
    if (!box) throw new Error('Bounding box not found');

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
