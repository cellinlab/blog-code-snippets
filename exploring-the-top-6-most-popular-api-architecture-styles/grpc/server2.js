const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  './calculator.proto',
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;

const client = new calculatorProto.Calculator(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

function runCalculator() {
  const a = 10;
  const b = 5;

  // 调用 Add 方法
  client.Add({ a, b }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Add Result: ${response.result}`);
  });

  // 调用 Subtract 方法
  client.Subtract({ a, b }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Subtract Result: ${response.result}`);
  });
}

runCalculator();