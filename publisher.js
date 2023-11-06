const amqp = require('amqplib');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queueName = 'message_queue';

    rl.question('Enter your message: ', async (message) => {
      await channel.assertQueue(queueName, { durable: false });
      channel.sendToQueue(queueName, Buffer.from(message));

      console.log(`Sent: ${message}`);
      
      setTimeout(() => {
        connection.close();
        rl.close();
        process.exit(0);
      }, 500);
    });
  } catch (error) {
    console.error(error);
  }
}

connect();
