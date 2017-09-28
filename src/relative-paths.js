const path = require('path')
const webtouch = require('webtouch')
const url = require('url')

module.exports = (uiPath) => {
  const ep = `http://localhost:${process.env.PORT}`
  return new Promise((resolve, reject) => {
    webtouch(ep, (err, urls) => {
      if (err) return reject(err)
      resolve([...new Set(
        urls
          .map((x) => url.parse(x))
          .filter((x) => x.host.startsWith('localhost'))
          .map((x) => x.pathname)
          .filter((x) => x !== '/')
          .concat(['/service-worker.js'])
          .concat(
            Object.values(
              require(path.join(uiPath, 'asset-manifest.json'))
            )
            .map((x) => '/' + x)
          )
      )]
      .sort((a, b) => b.length - a.length))
    })
  })
}
