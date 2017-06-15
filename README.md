# serve-create-react-app

serve [create-react-app](https://github.com/facebookincubator/create-react-app) using [serve](https://github.com/zeit/serve) as single page application.

use when you want a backened to your react app.

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![downloads](https://img.shields.io/npm/dm/serve-create-react-app.svg)](https://npmjs.org/package/serve-create-react-app)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/serve-create-react-app.svg)](https://greenkeeper.io/)

# example

server

```javascript
const serve = require('serve-create-react-app')('COOKIE_NAME_FOR_BASE_URL')
// base url set by process.env.REACT_APP_BASE_URL
serve(req, res)
```

# basic auth
supports `process.env.SERVE_USER` and `process.env.PASSWORD` see documentation [here](https://github.com/zeit/serve#authentication)

# build
```sh
serve-create-react-app [path-to-react]
```

# license

[Apache License, Version 2.0](LICENSE)
