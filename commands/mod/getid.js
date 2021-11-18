const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class id extends Command {
  constructor(client) {
    super(client, {
      name: "getid",
      aliases: ["gid"],
      group: "mod",
      memberName: "getid",
      description: "Gets the userId of the specified username",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Roblox username?",
          key: "username"
        }
      ]
    });
  }
  async run(msgObject, { username, reason }) {
    let target = await request({
      uri: `https://api.roblox.com/users/get-by-username?username=${username}`,
      json: true,
      simple: false
    });
    let msg = await msgObject.reply(
      `Coolio!! Let's get on with this and get \`${
        /*target.Username*/ username
      }\`'s id`
    );
    if (target.errorMessage) {
      return msg.edit(`Sorry 😣! You haven't entered a valid Roblox username!`);
    } else {
      msg.edit(`Ooooh, we've got their UserID as \`${target.Id}\`!`);
      msg.edit(`Wowzers, I got their UserID as \`${target.Id}\`!`);
    }
  }
};
