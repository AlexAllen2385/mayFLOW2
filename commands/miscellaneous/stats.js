const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class whois extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      aliases: ["statues"],
      group: "miscellaneous",
      memberName: "stats",
      description: "Checks your in-game player stats."
    });
  }
  async run(msgObject) {
    const mainserver = msgObject.client.guilds.get("725522754828369944");
    let channel = mainserver.channels.find("id", "725536847723364382");
    let editMessage = await msgObject.reply("Fetching your data...");
    let authorData = await request({
      uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
      json: true,
      simple: false
    });
    let Username = authorData.robloxUsername;
    let TotalLogs = 0;
    channel.messages.forEach(msgObjectAddon => {
      //  let Embed = msgObjectAddon.embeds[0]
      //  let EventType = Embed.author.name
      //  let Desc = Embed.description
      TotalLogs = TotalLogs + 1;
    });
    setTimeout(() => {
      editMessage.edit(`Fetched a total of ${TotalLogs} logs.`);
    }, 5000);
  }
};
