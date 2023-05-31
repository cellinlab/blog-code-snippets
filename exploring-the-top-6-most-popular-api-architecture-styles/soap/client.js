const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';

soap.createClient(url, function (err, client) {
  if (err) {
    console.error(err);
  } else {
    client.sayHello({ name: 'Cell' }, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  }
});