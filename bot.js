const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db");

const serverStats = {
    guildID: '508322615329423392',
    ticketCategoryID: '548551652265951232'

}
var utils = require('bot-utils')

var presences = [
    "HELP FOR DM ME",
    "to help Trivia Plus",
]




client.on('ready', () => {
    client.user.setActivity(utils.randItemFromArray(presences)).then(() => {
        setTimeout(() => {
            client.user.setActivity(utils.randItemFromArray(presences))
        }, 1)
    })
})

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') {
        let active = await db.fetch(`support_${message.author.id}`);
        let guild = client.guilds.get(serverStats.guildID);
        let channel, found = true;
        try {
            if (active) client.channels.get(active.channelID)
                .guild;
        } catch (e) {
            found = false;
        }
        if (!active || !found) {
            active = {};
            channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`)
            channel.setParent(serverStats.ticketCategoryID)
            channel.setTopic(`-close to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)

            channel.overwritePermissions("547412713152970784", {   ///Private crack
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("540746015528058899", {   ///all time supporter
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("541666658356297729", {   ///coin bot access
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("544893073856004097", {   ///paid member
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("532629827732373534", {   ///bot fixer
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("544588537606176768", {   ///bot controler
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("547649177669206016", {   ///trivia crack member
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("544225979103576065", {   ///moderator
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            channel.overwritePermissions("543840213651161101", {   ///tickety
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });



            let author = message.author;
            const newChannel = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(author.tag, author.avatarURL)
                .setFooter('Support Ticket Created!')
                .addField('User', author)
                .addField('ID', author.id)
            await channel.send(newChannel);
            const newTicket = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hello, ${author.username}`, author.avatarURL)
                .setFooter('Support Ticket Created!')
            await author.send(newTicket);
            active.channelID = channel.id;
            active.targetID = author.id;
        }
        channel = client.channels.get(active.channelID);
        const dm = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`Thank you, ${message.author.username}`, message.author.avatarURL)
            .setFooter(`Your message has been sent - A staff member will be in contact soon.`)
        await message.author.send(dm);
        if (message.content.startsWith('?complete')) return;
        const embed5 = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(message.content)
            .setFooter(`Message Received - ${message.author.tag}`)
        await channel.send(embed5);
        db.set(`support_${message.author.id}`, active);
        db.set(`supportChannel_${channel.id}`, message.author.id);
        return;
    }
    let support = await db.fetch(`supportChannel_${message.channel.id}`);
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = client.users.get(support.targetID);
        if (!supportUser) return message.channel.delete();
        if (message.content.toLowerCase() === '.close') {
            const complete = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
                .setFooter('Ticket Closed -- Team TRIVIA CRACK')
                .setDescription('*Your ticket has been marked as complete. If you wish to reopen it, or create a new one, please send a message to the bot.*')
            supportUser.send(complete);
            message.channel.delete();
            db.delete(`support_${support.targetID}`);
            let inEmbed = new Discord.RichEmbed()
                .setTitle('Ticket Closed!')
                .addField('Support User', `${supportUser.tag}`)
                .addField('Closer', message.author.tag)
                .setColor('RANDOM')
            const staffChannel = client.channels.get('545474922466639892'); //Create a log channel and put id here
            staffChannel.send(inEmbed);
        }
        const embed4 = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setFooter(`Message Received - TRIVIA CRACK`)
            .setDescription(message.content)
        client.users.get(support.targetID)
            .send(embed4);
        message.delete({
            timeout: 10000
        });
        embed4.setFooter(`Message Sent -- ${supportUser.tag}`)
            .setDescription(message.content);
        return message.channel.send(embed4);
    }
});
client.login('NTQ4NTYwNDAwNzY1OTQzODA4.D1HMqw.jdycPymMuH6gcTaJFwftCkWY_I8')


