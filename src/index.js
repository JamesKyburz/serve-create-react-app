const serve = require('serve-handler')

const baseURL = process.env.PUBLIC_URL || ''
const uiPath = process.env.REACT_APP_BUILD

module.exports = cookieName => (req, res) => {
  if (cookieName && baseURL) {
    const cookieValue = encodeURIComponent(baseURL)
    const cookie = `${cookieName}=${cookieValue}; Path=/;`
    res.setHeader('Set-Cookie', cookie)
  }
  if (req.url.startsWith(baseURL)) req.url = req.url.slice(baseURL.length)

  return serve(req, res, {
    public: uiPath,
    rewrites: [
      {
        source: '**',
        destination: '/index.html'
      }
    ]
  })
}
