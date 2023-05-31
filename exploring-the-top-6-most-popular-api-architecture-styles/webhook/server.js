const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 使用body-parser中间件解析POST请求体
app.use(bodyParser.json());

// 处理Webhook请求
app.post('/webhook', (req, res) => {
  const orderData = req.body;

  // 将订单数据同步到第三方财务系统中
  syncOrderDataToFinanceSystem(orderData);

  // 响应Webhook请求
  res.send('Webhook received');
});

// 启动服务器
app.listen(3000, () => {
  console.log('Webhook server started on port 3000');
});

// 将订单数据同步到第三方财务系统中
function syncOrderDataToFinanceSystem(orderData) {
  // 在这里编写将订单数据同步到第三方财务系统的代码
  console.log('Order data synced to finance system:', orderData);
}
