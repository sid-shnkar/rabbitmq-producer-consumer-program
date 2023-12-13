const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`, (err, connection) => {
    if(err){
            throw err;
    }
    connection.createChannel((err, channel) => {
        if(err){
            throw err;
        }
        let queueName = "test_queue";
        let message = "This is a first message for test_queueu";
        channel.assertQueue(queueName, {
            durable: false
        });
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`Message: ${message}`);
        setTimeout(() => {
            connection.close();
        }, 1000);
    })
})