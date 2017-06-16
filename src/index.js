const serve = require('serve/lib/server')
const uiPath = require('./ui-path')

// taken from serve cli!
process.env.ASSET_DIR = '/' + Math.random().toString(36).substr(2, 10)

module.exports = (cookieName) => {
  const baseURL = process.env.REACT_APP_BASE_URL

  const uiIgnored = [ '.DS_Store', '.git/', 'node_modules' ]
  return (req, res) => {
    if (cookieName && baseURL) {
      const cookieValue = encodeURIComponent(process.env.REACT_APP_BASE_URL)
      const cookie = `${cookieName}=${cookieValue}; Path=/;`
      res.setHeader('Set-Cookie', cookie)
    }
    if (req.url.match(/css$/i)) req.url = req.url.match(/\/css\/.*/i)[0]
    if (req.url.match(/js$/i)) req.url = req.url.match(/\/static\/js.*/i)[0]
    const uiPath = process.REACT_APP_BUILD
    const uiFlags = { single: true, auth: !!process.env.SERVE_USER }
    serve(req, res, uiFlags, uiPath, uiIgnored)
  }
}
