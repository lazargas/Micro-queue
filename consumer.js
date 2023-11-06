const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queueName = 'message_queue';

    await channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);

    channel.consume(queueName, (message) => {
      console.log(`Received: ${message.content.toString()}`);
    }, { noAck: true });
  } catch (error) {
    console.error(error);
  }
}

connect();
