var postdata = require("./");
var http = require('http');
var request = require("request");
var exec = require("child_process").exec;
var fs = require("fs");

var handler;
var server;

before(function(done){
  server = http.createServer(function (request, response) {
    handler(request, response);
  }).listen(1337, '0.0.0.0');
  done();
});

it('fetches and parses post data', function(done){
  handler = function (request, response) {
    postdata(request, function (error, data) {
      expect(error).to.not.exist;
      expect(data.foo).to.equal('bar');
      expect(data.qux).to.equal(123);
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('Hello World\n');
      done();
    });
  };

  request.post({ url: 'http://localhost:1337', json: { "foo": "bar", "qux": 123 } });
});

it('uploads a file', function(done){
   handler = function (request, response) {
     postdata(request, function (error, data, files) {
       expect(error).to.not.exist;
       response.writeHead(200, { 'Content-Type': 'text/plain' });
       response.end('');

       var poem = "Sabah şairin üstüne saldırıyor\n" +
             "yaşamaktan bir güneşle kaplanıyor onun kalbi\n" +
             "onun kalbi topraktan sıyrılıyor\n" +
             "aşk dahi sıyrılıyor topraktan\n" +
             "gözlerini tanıyorsunuz: çaylak sürüleri\n" +
             "beyni: aç kuşlardan bir ambar.\n";

       expect(poem).to.equal(fs.readFileSync(files.poem.path).toString());
       done();
     });
   };

  exec('curl -F "comment=This is poem by İsmet Özel" -F "poem=@example-file.txt" http://azer.io:1337', function (error, stdout, stderr) {
    if (error) throw error;
  });
});

after(function(done){
  server.close();
  done();
});
