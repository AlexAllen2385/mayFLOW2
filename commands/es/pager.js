const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const mongoose = require("mongoose");
const path = require("path");
const pagerSchema = require(path.join(
  __dirname + "/../../models",
  "pagersch.js"
));

module.exports = class pager extends Command {
  constructor(client) {
    super(client, {
      name: "pager",
      group: "es",
      memberName: "pager",
      description: "Sends an alert to the pager.",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the reason for the pager?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
      if (msgObject.channel.id == 729477930882957332) {
      return true;
    } else {
      return "Sorry :persevere:! You must use this in #es-general!";
    }
  }
  async run(msgObject, { reason }) {
    mongoose.connect(
        "mongodb+srv://mayflow:Be4K2HqWgI8BGyEv@mayflowdata-dtfz1.mongodb.net/mayFLOWData?retryWrites=true&w=majority",
      {
        useNewUrlParser: true
      }
    );
    let authorData = await request({
      uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
      json: true,
      simple: false
    });

    pagerSchema.findOne(
      {
        pagerplayer: msgObject.author.id
      },
      (err, pg) => {
        if (!pg || pg === null) {
          const mainserver = msgObject.client.guilds.get("725522754828369944");
          let channel = mainserver.channels.find("id", "729477940454096948");
          channel.send("@here").then(PM => {
            let embed = new Discord.RichEmbed()
              .setAuthor(msgObject.member.displayName)
              .setTitle("New Pager!")
              .setDescription(reason)
              .addField(
                "Links",
                `[Roblox Profile](https://www.roblox.com/users/${authorData.robloxId}/profile)\n\[Game Link](https://www.roblox.com/games/5301570651/)`
              )
              .setTimestamp()
              .setColor("RED");
            channel.send(embed).then(m => {
              m.react("✅");
              const newPAGER = new pagerSchema({
                _id: mongoose.Types.ObjectId(),
                pagerplayer: msgObject.author.id,
                pagerid: m.id,
                pagertagid: PM.id,
                secondarypagerid: ""
              });
              newPAGER.save();
              msgObject.reply(
                "Cheers, that's been added to <#729477940454096948>!"
              );
            });
          });
        } else {
          msgObject.reply(
            "Sorry :persevere:! You already have an active pager."
          );
          return;
        }
      }
    );
  }
};
