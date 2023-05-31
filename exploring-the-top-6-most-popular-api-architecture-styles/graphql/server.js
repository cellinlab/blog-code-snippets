const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// 定义 schema
const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Order {
    id: ID!
    products: [Product!]!
    total: Float!
  }

  type Query {
    product(id: ID!): Product
    products: [Product!]!
    order(id: ID!): Order
    orders: [Order!]!
  }

  type Mutation {
    createOrder(productIds: [ID!]!): Order
    cancelOrder(id: ID!): Order
  }
`);

// 模拟数据
const products = [
  { id: '1', name: 'iPhone', description: 'Apple iPhone', price: 999 },
  { id: '2', name: 'iPad', description: 'Apple iPad', price: 799 },
  { id: '3', name: 'MacBook', description: 'Apple MacBook', price: 1299 },
];

const orders = [];

// 定义 resolver
const root = {
  // 查询单个商品
  product: ({ id }) => {
    return products.find(product => product.id === id);
  },

  // 查询所有商品
  products: () => {
    return products;
  },

  // 查询单个订单
  order: ({ id }) => {
    return orders.find(order => order.id === id);
  },

  // 查询所有订单
  orders: () => {
    return orders;
  },

  // 创建订单
  createOrder: ({ productIds }) => {
    const selectedProducts = products.filter(product => productIds.includes(product.id));
    const total = selectedProducts.reduce((acc, product) => acc + product.price, 0);
    const order = { id: orders.length + 1, products: selectedProducts, total };
    orders.push(order);
    return order;
  },

  // 取消订单
  cancelOrder: ({ id }) => {
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw new Error(`Order with id ${id} not found`);
    }
    const order = orders[index];
    orders.splice(index, 1);
    return order;
  },
};

// 创建 express app
const app = express();

// 添加 graphql 中间件
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// 监听端口
app.listen(3000, () => {
  console.log('GraphQL server running at http://localhost:3000/graphql');
});