module.exports = {
  siteUrl: 'https://www.rohitdebugbugs.in',
  generateRobotsTxt: false,
  exclude: ['/admin', '/admin/*', '/api/*'],
  transform: async (config, path) => {
    if (path !== '/') return null;

    return {
      loc: config.siteUrl,
      changefreq: 'weekly',
      priority: 1,
      lastmod: new Date().toISOString(),
    };
  },
}
