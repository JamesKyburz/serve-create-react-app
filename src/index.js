const serve = require('serve/lib/server')
const relativePaths = require('./relative-paths')

// taken from serve cli!
process.env.ASSET_DIR = '/' + Math.random().toString(36).substr(2, 10)

module.exports = (cookieName) => {
  const baseURL = process.env.PUBLIC_URL || ''
  const uiPath = process.env.REACT_APP_BUILD
  const uiIgnored = [ '.DS_Store', '.git/', 'node_modules' ]
  let rootUrls = []

  route.buildRelativePaths = () => {
    return (
      relativePaths(uiPath)
      .then((urls) => { rootUrls = urls })
    )
  }

  return route

  function route (req, res) {
    if (cookieName && baseURL) {
      const cookieValue = encodeURIComponent(baseURL)
      const cookie = `${cookieName}=${cookieValue}; Path=/;`
      res.setHeader('Set-Cookie', cookie)
    }
    const uiFlags = { single: true, auth: !!process.env.SERVE_USER }
    const overrideUrl = rootUrls.find((x) => req.url.indexOf(x) !== -1)
    if (req.url.startsWith(baseUrl)) req.url = req.url.slice(baseUrl.length)
    if (overrideUrl) req.url = overrideUrl
    serve(req, res, uiFlags, uiPath, uiIgnored)
  }
}
