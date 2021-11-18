const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "changelog",
      aliases: ["cl"],
      group: "miscellaneous",
      memberName: "changelog",
      description: "Posts a change log to the change log channel",
      ownerOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Description?",
          key: "description"
        }
      ]
    });
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("725522754828369944")
      .channels.find("id", "725535564404883467");
    channel.send("@here");
    let Embed = new Discord.RichEmbed()
      .setColor("#2F3137")
      .setTitle("Change Log")
      .setDescription(description)
      .setTimestamp();
    channel.send(Embed);
  }
};
