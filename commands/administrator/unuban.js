const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class uban extends Command {
  constructor(client) {
    super(client, {
      name: "unuban",
      group: "administrator",
      memberName: "unuban",
      description: "Unbans a user from all Discords",
      guildOnly: true,
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "target"
        },
        {
          type: "string",
          prompt: "What is the reason for un ultra banning this user?",
          key: "reason",
          default: "No Reason Provided"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.find(role => role.name === "Admin")) {
      return true;
    }
    return "Sorry! You must be a Admin!";
  }
  async run(msgObject, { target, reason }) {
    msgObject.reply(
      `Coolio :joy::joy:! Let's unban em' from everything! :gun:`
    );
    this.client.guilds.forEach(m => {
      m.unban(target.id, `"${reason}" - ${msgObject.author.tag}`);
    });
    msgObject.channel.send(
      `Unbanned ${target.tag} in all the servers :triumph::relieved:! All done!`
    );
  }
};
