## post-data [![Build Status](https://travis-ci.org/azer/post-data.png)](https://travis-ci.org/azer/post-data)

Minimalistic wrapper around `formidable`.

## Install

```bash
$ npm install post-data
```

## Usage

```js
postdata = require('post-data')

postdata(request, function (error, data) {
  if (error) throw error;

  data
  // => "{ \"foo\": \"bar\" }
});
```

Parsing:

```js
postdata(request, JSON.parse, function (error, data) {
  data
  // => { "foo": "bar" }
})
```

See `test.js` for more info.
