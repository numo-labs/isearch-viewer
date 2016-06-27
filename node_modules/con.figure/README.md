# con.figure

Ever had multiple environments which need different configurations
and always find that you end up writing your own thing for each project? 
`con.figure` aims to be a module where all you need to do is specify a 
common hash in a JSON file or JS Object and then a new hash for each 
environment.

## Example
```json
{ "common":
  { "http":
    { "host": "0.0.0.0"
    , "port": 17999
    }
  , "mongo":
    { "host": "127.0.0.1"
    , "port": 27017
    , "database": "test"
    }
  }
  , "log": false
, "production":
  { "http":
    { "host": "example.com"
    , "port": 8080
    }
  }
, "staging":
  { "http":
    { "host": "example.com"
    , "port": 8080
    }
  }
, "testing":
  { "http":
    { "port": 18000
    }
  }
, "development":
  { "http":
    { "port": 18000
    }
  , "mongo":
    { "prop": true
    }
  , "log": true
  }
}
```

## License

(The MIT License)

Copyright (c) 2011 Tom Gallacher &lt;<http://www.tomg.co>&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
