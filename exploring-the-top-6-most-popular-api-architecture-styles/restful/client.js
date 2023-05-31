const axios = require('axios');

const apiUrl = 'http://localhost:3000/api';

// 获取所有用户列表
axios.get(`${apiUrl}/users`)
  .then(response => {
    console.log('All users:', response.data);
  })
  .catch(error => {
    console.error('Failed to get users:', error.message);
  });

// 获取指定用户信息
axios.get(`${apiUrl}/users/1`)
  .then(response => {
    console.log('User 1:', response.data);
  })
  .catch(error => {
    console.error('Failed to get user 1:', error.message);
  });

// 创建一个新用户
axios.post(`${apiUrl}/users`, { name: 'David' })
  .then(response => {
    console.log('New user:', response.data);
  })
  .catch(error => {
    console.error('Failed to create user:', error.message);
  });

// 更新指定用户信息
axios.put(`${apiUrl}/users/1`, { name: 'Alice Smith' })
  .then(response => {
    console.log('Updated user 1:', response.data);
  })
  .catch(error => {
    console.error('Failed to update user 1:', error.message);
  });

// 删除指定用户
axios.delete(`${apiUrl}/users/1`)
  .then(response => {
    console.log('Deleted user 1:', response.data);
  })
  .catch(error => {
    console.error('Failed to delete user 1:', error.message);
  });