// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://amulya-ai.com',
  generateRobotsTxt: true,
  outputFileTrailingSlash: false,
  changefreq: 'daily',
  priority: 1,
  exclude: ['/api/*', '/admin/*', '/auth/*'],
}
