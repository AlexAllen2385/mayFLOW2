const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class pet extends Command {
  constructor(client) {
    super(client, {
      name: "pet",
      group: "miscellaneous",
      memberName: "pet",
      description: "Find a random #pet-logs message",
      guildOnly: true
    });
  }
  async run(msgObject, { target, reason }) {
    const mainserver = msgObject.client.guilds.get("725522754828369944");
    let channel = mainserver.channels.find("id", "725536732820537395");
    channel
      .fetchMessages()
      .then(messages => {
        let randomMsg = messages.random();
        let made = new Date(randomMsg.createdTimestamp);
        let date = made.toDateString();
        msgObject.reply(
          `<#725536732820537395> - ${date}:\n\  ${randomMsg.content}`
        );
      })
      .catch(console.error);
  }
};
