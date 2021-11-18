const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class whois extends Command {
  constructor(client) {
    super(client, {
      name: "whois",
      aliases: ["check"],
      group: "miscellaneous",
      memberName: "whois",
      description: "Checks a user",
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "argUser"
        }
      ]
    });
  }
  async run(msgObject, { argUser }) {
    let made = new Date(argUser.createdTimestamp);
    let date = made.toDateString();
    let editMessage = await msgObject.reply("Fetching user's data...");
    let Embed = new Discord.RichEmbed()
      .setAuthor(argUser.tag, argUser.avatarURL)
      .setColor("#2F3137")
      .setTitle("User Information")
      .setDescription(`<@${argUser.id}>`)
      .addField("Created At", date)
      .addField("Id", argUser.id, true)
      .addField("Username", argUser.username, true)
      .addField("Discriminator", argUser.discriminator, true)
      .addField("Bot", argUser.bot, true)
      .setTimestamp();
    editMessage.edit("Done!");
    editMessage.edit(Embed);
    let editMsg = await msgObject.reply(
      "Checking if a roblox account is linked..."
    );
    let data = await request({
      uri: `https://verify.eryn.io/api/user/${argUser.id}`,
      json: true,
      simple: false
    });
    if (data.robloxUsername !== undefined) {
      editMsg.edit("A roblox account is linked! Fetching data...");
      let Data = await request({
        uri: `https://api.roblox.com/users/get-by-username?username=${data.robloxUsername}`,
        json: true,
        simple: false
      });
      const profileLink = `https://www.roblox.com/users/${data.robloxId}/profile`;
      const avatarURL = `https://assetgame.roblox.com/Thumbs/Avatar.ashx?username=${encodeURIComponent(
        data.robloxUsername
      )}`;
      let pastNames = "None";
      let joinDate = "Unknown";
      try {
        const profileSource = await request({
          uri: profileLink
        });

        joinDate = profileSource.match(
          /Join Date<p class=text-lead>(.*?)<li/
        )[1];
        pastNames = profileSource
          .match(
            /<span class=tooltip-pastnames data-toggle=tooltip title="?(.*?)"?>/
          )[1]
          .substr(0, 1024);
      } catch (e) {}
      let Plan = "Unknown";
      try {
        const response = await request({
          uri: `https://groups.roblox.com/v1/users/${encodeURIComponent(
            data.robloxId
          )}/group-membership-status`,
          simple: false,
          resolveWithFullResponse: true
        });
        const membershipType = JSON.parse(response.body).membershipType;
        Plan = "None";

        if (membershipType === 4) {
          Plan = "Premium";
        }
      } catch (e) {}
      let RobloxEmbed = new Discord.RichEmbed()
        .setAuthor(Data.Username, avatarURL)
        .setColor("#2F3137")
        .setTitle(Data.Username)
        .setURL(profileLink)
        .addField("UserID", Data.Id, true)
        .addField("Join date", joinDate, true)
        .addField("Past Names", pastNames, true)
        .addField("Membership", Plan, true);
      editMsg.edit("Done!");
      editMsg.edit(RobloxEmbed);
    } else {
      editMsg.edit("A roblox account is not linked!");
      editMsg.delete();
    }
  }
};
