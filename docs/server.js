const fs = require('fs');
const url = require('url');
const https = require('https');
const Chance = require('chance');

const chance = new Chance();

const ssl = {
  cert: '',
  key: ''
};


function readFile(filename) {
  try {
    return fs.readFileSync(filename).toString().replace(/^\s+|\s+$/g, '');
  } catch (e) {
    console.error(`'${filename}' missing or inaccesible`);
    console.error(e);
    return 'missing';
  }
}

ssl.cert = readFile('secure/cert.pem');
ssl.key = readFile('secure/cert.key');

function requestCard(response, begin, end) {
  const result = [];

  begin = parseInt(begin, 10);
  end = parseInt(end, 10);

  if (!end) {
    end = begin + 5;
  }

  for (let i = begin; i <= end; i++) {
    result.push(
        {id: i, image: `https://picsum.photos/30/30/?random`, title: chance.sentence({words: 5})});
  }

  response.write(JSON.stringify(result));
}

function requestCardRandom(response) {
  const result = [];

  end = chance.integer({min: 3, max: 10});

  for (let i = 0; i <= end; i++) {
    result.push({image: `https://picsum.photos/30/30/?random`, title: chance.sentence({words: 5})});
  }

  response.write(JSON.stringify(result));
}

function requestNotFound(response) {
  response.write('Not found');
  response.writeHead(404);
}

const server = https.createServer(ssl, (request, response) => {
  const path = url.parse(request.url, true);
  const pathname = path.pathname.split('/');

  if (!pathname || !pathname.length) {
    requestNotFound(response);
    return
  }

  const type = pathname[1];

  console.log(request.url);

  switch (type) {
    case 'card':
      if (path.query.begin) {
        requestCard(response, path.query.begin, path.query.end);
      } else {
        requestCardRandom(response);
      }
      break;
    default:
      requestNotFound(response);
      break;
  }

  response.end();
});

const port = 4300;
if (process.argv.length > 2) {
  port = process.argv[2];
}
server.listen(port);
console.log('listening on port: ' + port);
