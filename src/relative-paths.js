const path = require('path')
const webtouch = require('webtouch')
const url = require('url')

module.exports = (uiPath, token) => {
  const credentials = process.env.SERVE_USER
    ? `${process.env.SERVE_USER}:${process.env.SERVE_PASSWORD}@`
    : ''
  const tokenSuffix = token ? `/?token=${token}` : ''
  const ep = `http://${credentials}localhost:${process.env.PORT}${tokenSuffix}`
  return new Promise((resolve, reject) => {
    webtouch(ep, (err, urls) => {
      if (err) return reject(err)
      resolve(
        [
          ...new Set(
            urls
              .map(x => url.parse(x))
              .filter(x => x.host.startsWith('localhost'))
              .map(x => x.pathname)
              .filter(x => x !== '/')
              .concat(['/service-worker.js'])
              .concat(
                Object.values(
                  require(path.join(uiPath, 'asset-manifest.json'))
                ).map(x => '/' + x)
              )
          )
        ].sort((a, b) => b.length - a.length)
      )
    })
  })
}
