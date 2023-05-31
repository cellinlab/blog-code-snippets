const soap = require('soap');
const express = require('express');

const fs = require('fs');

const port = 8000;
const xml = fs.readFileSync('service.wsdl', 'utf8');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello SOAP!');
});

const service = {
  MyService: {
    MyServicePort: {
      sayHello(args) {
        return {
          msg: `Hello ${args.name}!`
        };
      }
    }
  }
};

app.listen(port, () => {
  const soapServer = soap.listen(app, '/wsdl', service, xml);

  console.log(`SOAP service listening at http://localhost:${port}/wsdl?wsdl`);

  soapServer.log = (type, data) => {
    console.log(type, data);
  }
});
