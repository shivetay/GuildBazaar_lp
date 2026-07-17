import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = 'http://localhost:3001'
const OUT = path.join(__dirname, '../public/screenshots')

async function capture(page, url, filename) {
  await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  await page.screenshot({
    path: path.join(OUT, filename),
    type: 'jpeg',
    quality: 85,
  })
  console.log(`Saved ${filename}`)
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

  await capture(page, '/home', 'home-offers.jpg')

  await page.goto(`${BASE}/home`, { waitUntil: 'networkidle' })
  await page.getByRole('tab', { name: 'Bractwa i stowarzyszenia' }).click()
  await page.waitForTimeout(800)
  await page.screenshot({
    path: path.join(OUT, 'home-associations.jpg'),
    type: 'jpeg',
    quality: 85,
  })
  console.log('Saved home-associations.jpg')

  await capture(page, '/vendor', 'vendor-panel.jpg')
  await capture(page, '/association-panel', 'association-panel.jpg')

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
