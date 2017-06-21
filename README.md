# serve-create-react-app

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![downloads](https://img.shields.io/npm/dm/serve-create-react-app.svg)](https://npmjs.org/package/serve-create-react-app)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/serve-create-react-app.svg)](https://greenkeeper.io/)

serve [create-react-app](https://github.com/facebookincubator/create-react-app) using [serve](https://github.com/zeit/serve) as single page application.

use when you want a backened to your react app.

# example

server

```javascript
process.env.REACT_APP_BUILD=[path to react app build directory]
const serve = require('serve-create-react-app')('COOKIE_NAME_FOR_BASE_URL')
// base url set by process.env.PUBLIC_URL
serve(req, res)
```

# basic auth
supports `process.env.SERVE_USER` and `process.env.PASSWORD` see documentation [here](https://github.com/zeit/serve#authentication)

# build
```sh
serve-create-react-app [path-to-react]
```

# usage when pathname is not root

Make sure homepage is "." in your react app's `package.json`.

This is documented [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-the-same-build-from-different-paths)

Then when running set `process.env.PUBLIC_URL`

## buildRelativePaths returns a promise.

You will need to call `serve.buildRelativePaths` when the http is running.

```javascript
const serve = require('serve-create-react-app')('COOKIE_NAME_FOR_BASE_URL')
serve.buildRelativePaths()
```

# usage when pathname is root

Make sure homepage is not added to react app's `package.json`.

Run without setting `process.env.PUBLIC_URL`

# example Dockerfile
```dockerfile
FROM jameskyburz/node:8.0.0-alpine

ENV REACT_APP_BUILD /usr/src/app/src/ui/build

RUN ./node_modules/.bin/serve-create-react-app

USER node

EXPOSE 5000
```

# example Docker run

```sh
docker run my-image -e PUBLIC_URL=/foo
```

# license

[Apache License, Version 2.0](LICENSE)
