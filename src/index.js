const serve = require('serve/lib/server')
const fs = require('fs')
const path = require('path')
const glob = require('glob')


// taken from serve cli!
process.env.ASSET_DIR = '/' + Math.random().toString(36).substr(2, 10)

module.exports = (cookieName) => {
  const baseURL = process.env.PUBLIC_URL || ''
  const uiPath = process.env.REACT_APP_BUILD

  const replaceFiles = glob.sync(path.join(uiPath, '**/*.*(js|js.map|html)'))

  replaceFiles.forEach((replaceFile) => {
    fs.writeFileSync(
      replaceFile,
      fs.readFileSync(replaceFile, 'utf-8').replace(/%PUBLIC_URL%/g, baseURL)
    )
  })

  const uiIgnored = [ '.DS_Store', '.git/', 'node_modules' ]
  return (req, res) => {
    if (cookieName && baseURL) {
      const cookieValue = encodeURIComponent(baseURL)
      const cookie = `${cookieName}=${cookieValue}; Path=/;`
      res.setHeader('Set-Cookie', cookie)
    }
    const uiPath = process.env.REACT_APP_BUILD
    const uiFlags = { single: true, auth: !!process.env.SERVE_USER }
    serve(req, res, uiFlags, uiPath, uiIgnored)
  }
}
