module.exports = {
    name: 'hello',
    aliases: ['hi'],
    description: 'Say Hello FeedBack',
    execute(msg) {
        msg.channel.send(`${msg.author} Hi :)`);
    }
}