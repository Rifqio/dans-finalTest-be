/* eslint-disable no-undef */
const amqp = require('amqplib');

const rabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_HOST);
    return connection;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { rabbitMQ };
