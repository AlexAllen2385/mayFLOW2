const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
    "79d586fb78265b7ae11400ebab0267e5",
  "70522557cca59c2482ead289e9578817b17f5c956ff2c5968a127dfc9d38afb0"
);

module.exports = class gtban extends Command {
  constructor(client) {
    super(client, {
      name: "gtban",
      aliases: ["gametban", "remotetban"],
      group: "mod",
      memberName: "gtban",
      description: "TBans a user from the game",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Roblox username?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What is the reason for temp banning this user?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("725522754828369944");
    if (msgObject.guild.id == 719627673839861830) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(msgObject, { username, reason }) {
    const editMessage = await msgObject.reply(
      `Coolio!! Let's get on with this and ban \`${username}\``
    );
    let data = await request({
      uri: `https://api.roblox.com/users/get-by-username?username=${username}`,
      json: true,
      simple: false
    });
    if (data.errorMessage) {
      return editMessage.edit(
        "Sorry 😣! You haven't entered a valid Roblox username!"
      );
    } else {
      editMessage.edit(`Ooooh, we've got their UserID as \`${data.Id}\`!`);
      let authorData = await request({
        uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
        json: true,
        simple: false
      });
      editMessage.edit(
        `Ooooh, we've also got your UserID as \`${authorData.robloxId}\`!`
      );
      editMessage.edit(
        `Congrats 🙌! Your command will be executed in-game shortly!`
      );
      trello.addCard(
        `${editMessage.channel.id} ${editMessage.id} ${authorData.robloxId} tban ${data.Id} ${reason}`,
        "",
        "5f026dca77c7d7591988b030"
      );
    }
  }
};
