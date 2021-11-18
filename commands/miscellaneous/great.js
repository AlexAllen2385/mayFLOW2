const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class great extends Command {
  constructor(client) {
    super(client, {
      name: "great",
      group: "miscellaneous",
      memberName: "great",
      description: "Find a random #great-logs message",
      guildOnly: true
    });
  }
  async run(msgObject, { target, reason }) {
    const mainserver = msgObject.client.guilds.get("725522754828369944");
    let channel = mainserver.channels.find("id", "725536709672042577");
    channel
      .fetchMessages()
      .then(messages => {
        let randomMsg = messages.random();
        let made = new Date(randomMsg.createdTimestamp);
        let date = made.toDateString();
        msgObject.reply(
          `<#725536709672042577> - ${date}:\n\  ${randomMsg.content}`
        );
      })
      .catch(console.error);
  }
};
