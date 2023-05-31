// 引入 ws 模块
const WebSocket = require('ws');

// 创建 WebSocket 客户端
const socket = new WebSocket('ws://localhost:8080');

// 监听连接成功事件
socket.addEventListener('open', (event) => {
  console.log('已连接到 WebSocket 服务器');

  // 向服务器发送消息
  socket.send('你好，WebSocket 服务器');
});

// 监听收到服务器消息事件
socket.addEventListener('message', (event) => {
  console.log(`收到服务器消息：${event.data}`);
});

// 监听连接关闭事件
socket.addEventListener('close', (event) => {
  console.log('WebSocket 连接已关闭');
});

// 监听连接错误事件
socket.addEventListener('error', (event) => {
  console.log('WebSocket 连接发生错误');
});