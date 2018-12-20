# serve-create-react-app

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![downloads](https://img.shields.io/npm/dm/serve-create-react-app.svg)](https://npmjs.org/package/serve-create-react-app)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/serve-create-react-app.svg)](https://greenkeeper.io/)

serve [create-react-app](https://github.com/facebookincubator/create-react-app) using [serve](https://github.com/zeit/serve) as a single page application.

use when you want a backened to your react app.

# example

server

```javascript
process.env.REACT_APP_BUILD=[path to react app build directory]
// base url set by process.env.PUBLIC_URL
const serve = require('serve-create-react-app')('COOKIE_NAME_FOR_BASE_URL')
await serve(req, res)
```

# build
```sh
serve-create-react-app [path-to-react]
```

# usage when pathname is not root

Make sure homepage is "." in your react app's `package.json`.

This is documented [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-the-same-build-from-different-paths)

Then when running set `process.env.PUBLIC_URL`

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
