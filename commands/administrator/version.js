const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
 const version = 1.02;
module.exports = class version extends Command {
  constructor(client) {
    super(client, {
      name: "version",
      group: "administrator",
      memberName: "version",
      description: "Receives current bot version.",
      guildOnly: false,
      args: [
    
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.find(role => role.name === "Admin")) {
      return msgObject.reply("The currnet bot version is 1.03");
    }
    return "Sorry :persevere:! You must be a Admin!";
  }
  
};