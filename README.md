# NAT-Slipstream block

NAT-Slipstream block is a middleware that allows requests only from LAN
(with the option of choosing exceptions).

* [Installation](#installation)
* [Usage](#usage)

## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install nat-ssb
```

## Usage

### Quick start

message: returned value when the request fail (optional) <br>
callback: function that execute after the middleware with the ip as an argument (optional) <br>
exceptions: array of public ip that can access although they are not in the lan (optional) <br>

function
```javascript
natSSB({message}, function callback(ip) {}, [exceptions])
```

### Simple Usage
```javascript
const express = require('express')
const { natSSB } = require('nat-ssb')
const ssb = natSSB({message: 'Access Denied'}, function callback(ip) {
  console.log(`request from ip: ${ip}`);
}, [])

const app = express()
const port = 8080

app.use(ssb)

app.get('/', (req, res) => {
  console.log(`Hello World`)
  res.send(`Hello World`)
})

app.listen(port, () => {
  console.log(`Server app listening`)
})
```
