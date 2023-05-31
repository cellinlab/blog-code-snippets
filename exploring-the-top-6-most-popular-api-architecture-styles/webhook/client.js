const axios = require('axios');

const postData = {
  orderId: '123456',
  customerName: 'John Doe',
  totalPrice: 100.0
};

// 发送Webhook请求
axios.post('http://localhost:3000/webhook', postData)
  .then((response) => {
    console.log(`Webhook server responded with status code: ${response.status}`);
    console.log(`Response from webhook server: ${response.data}`);
  })
  .catch((error) => {
    console.error(`Error while sending webhook request: ${error}`);
  });