# opnr

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Sniffs `process.stdin` for [ndjson](https://github.com/maxogden/ndjson) and launches the browser when a message with `url` and `type: 'connect'` is consumed.

It looks for JSON objects with the following format:

```js
{ type: 'connect', url: 'some-page.com' }
```

URLs are parsed as addresses, so the above opens the default browser to `http://some-page.com/`. You can configure the action to listen for with the `--type` field.

This can be used alongside ndjson-emitting CLI tools, like [budo](https://github.com/mattdesl/budo):

```sh
# launch the browser once an available port is found
budo index.js | opnr
```

## Usage

[![NPM](https://nodei.co/npm/opnr.png)](https://www.npmjs.com/package/opnr)

```sh
Usage:
  opnr [opts]

Opts:
  --type    the "type" to launch on, defualt "connect"
```

## Example

A common scenario might be an async action triggered by a CLI tool that involves a browser launch.

`server.js`

```js
var http = require('http')

//get next available port
require('getport')(function(err, port) {
  if (err) 
    throw err

  //start your server
  var server = http.createServer(function(req, res) {
    res.end('hello')
  })
  server.listen(port, function(err) {
    if (err)
      throw err

    //print ndjson logs
    console.log(JSON.stringify({ 
      url: 'localhost:'+port, 
      type: 'connect',
      name: 'my-server',
      message: 'server running on '+port 
    }))
  })
})
```

Install `opnr`, and optionally `garnish` for prettier logs.

```sh
npm install opnr garnish -g
```

Now you can pipe things together to run your server and open the browser when ready. 

```sh
node server.js | opnr | garnish
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/opnr/blob/master/LICENSE.md) for details.
