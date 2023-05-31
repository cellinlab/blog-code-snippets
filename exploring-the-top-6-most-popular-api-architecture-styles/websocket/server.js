// 引入 ws 模块
const WebSocket = require('ws');

// 创建 WebSocket 服务器
const server = new WebSocket.Server({ port: 8080 });

// 监听连接事件
server.on('connection', (socket) => {
  console.log('客户端已连接');

  // 向客户端发送消息
  socket.send('欢迎连接 WebSocket 服务器');

  // 监听客户端发来的消息
  socket.on('message', (message) => {
    console.log(`收到客户端消息：${message}`);

    // 回复客户端消息
    socket.send(`服务器已收到消息：${message}`);
  });
});

// 输出服务器启动信息
console.log('WebSocket 服务器已启动，监听端口 8080');