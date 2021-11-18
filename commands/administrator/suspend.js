const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class id extends Command {
  constructor(client) {
    super(client, {
      name: "suspend",
      aliases: ["suspend"],
      group: "administrator",
      memberName: "suspend",
      description: "Grants a member a free pass to suspended land",
      guildOnly: true,
      args: [
        {
          type: "member",
          prompt: "What member do you want to role?",
          key: "member"
        },
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.find(role => role.name === "Admin")) {
      return true;
    }
    return "Sorry :persevere:! You must be a Admin!";
  }
  async run(msgObject, { member }) {
    let GuildMember = msgObject.guild.members.find(`id`, member.id);
    if (!GuildMember.roles.has("730664124333293638")) {
      GuildMember.addRole("730664124333293638");
      msgObject.reply(
          "Okay! " + member.user.tag + " has been suspended! :gun: :tada:"
      );
    } else {
      GuildMember.removeRole("730664124333293638");
      msgObject.reply(
        "Okay! " + member.user.tag + " has been unsuspended! :gun:"
      );
    }
  }
};
