# GitCloud Client

[![Build Status](https://travis-ci.org/jiahaog/gitcloud-client.svg?branch=master)](https://travis-ci.org/jiahaog/gitcloud-client)

## Installation

Only supported on Node >=v4.2 because of promise support.

If support is desired for earlier versions, a global promise polyfill is required.

```bash
$ npm install --save gitcloud
```

## Usage

```javascript
const gitCloud = require('gitcloud');

gitCloud('http://jiahaog.github.io/gitcloud')
    .then(fileIndex => {
        console.log(fileIndex);
    })
    .catch(error => {
        console.error(error);
    });
```

## Tests

```bash
$ npm test
```

## License

MIT
