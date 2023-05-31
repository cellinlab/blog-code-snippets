const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// 加载Proto文件
const packageDefinition = protoLoader.loadSync(
  './calculator.proto',
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

// 加载服务定义
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;

// 实现服务端方法
function add(call, callback) {
  const { a, b } = call.request;
  const result = a + b;
  callback(null, { result });
}

function subtract(call, callback) {
  const { a, b } = call.request;
  const result = a - b;
  callback(null, { result });
}

// 创建gRPC服务器
const server = new grpc.Server();

// 添加服务
server.addService(calculatorProto.Calculator.service, {
  Add: add,
  Subtract: subtract,
});

// 启动服务器
server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server running at http://localhost:50051');
});
