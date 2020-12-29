const fs = require('fs'); // dùng để dọc file từ bên ngoài, đây là core module của nodejs
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // use synchronous version
// console.log(json); // data chúng ta đọc từ file json
// console.log(__dirname); // C:\Users\HieuDZ\Documents\Study\JavaScript\Javascript-Course\99-bonus-1\starter
const laptopData = JSON.parse(json);
// console.log(laptopData);

const server = http.createServer((req, res) => { // tạo ra một server, callback func này sẽ được chạy mỗi khi ai đó run vào web server của chúng ta
  console.log('Someone did access the server');
  const pathName = url.parse(req.url, true).pathname;

  // retrieve the laptop id using the url module
  const query = url.parse(req.url, true).query
  // console.log("query: ", query); // example "laptop?id=10&name=honda", we got { id: '10', name: 'honda' }
  if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-Type' : 'text/html'} );

    fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => { // asynchronous function, using callback to handle
      let overviewOutput = data;
      fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => { // asynchronous function, using callback to handle
        const cardOutputs = laptopData.map(laptop => replaceTemplate(data, laptop)).join('');
        overviewOutput = overviewOutput.replace('{%CARDS%}', cardOutputs);

        res.end(overviewOutput);
      });
    });
  }

  else if (pathName === '/laptop' && query.id < laptopData.length && query.id >= 0) {
    res.writeHead(200, { 'Content-Type' : 'text/html'} );
    // res.end(`This is the LAPTOP page for laptop number ${query.id}`); // This is the LAPTOP page for laptop number 10
    fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => { // asynchronous function, using callback to handle
      const laptop = laptopData[query.id];
      const output = replaceTemplate(data, laptop);
      res.end(output);
    });
  }

  else if ((/\.(jpg|jpge|png|gif)$/i).test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
      res.writeHead(200, { 'Content-Type' : 'image/jpg'} );
      res.end(data);
    });
  }

  else {
    res.writeHead(404, { 'Content-Type' : 'text/html'} );
    res.end('The URL was not found on the server');
  }
});

server.listen(1337, '127.0.0.1', () => { // nói với nodejs luôn listen
  console.log('Listening for request');
});

function replaceTemplate(originalHTML, laptop) {
  let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  output = output.replace(/{%ID%}/g, laptop.id);
  return output;
}
