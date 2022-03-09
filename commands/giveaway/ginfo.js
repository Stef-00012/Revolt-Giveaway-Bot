export const command = {
  name: 'ginfo',
  category: 'Giveaway',
  showHelp: true,
  aliases: ['giveaway-info'],
  description: 'Gives informations about specified giveaway',
  utilisation: '{prefix}ginfo <giveaway id>',
  run: async function(client, message, args) {
    const id = args[0]
    if (!id) return message.channel.sendMessage('Please specify a giveaway id')
    const gawDb = await client.schemas.gaw.findOne({ serverId: message.server._id, id: id })
    if (!gawDb) return message.channel.sendMessage('I couldn\'t find this giveaway')
    
    const embed = {
      type: 'Text',
      description: `$\\Large\\textsf{Giveaway Info}$\n\n**Prize**: ${gawDb.prize}\n**Winners**: ${gawDb.winners}\n**Channel**: <#${gawDb.channelId}>\n**Started At**: <t:${Math.floor(gawDb.startDate.getTime() / 1000)}:D> (<t:${Math.floor(gawDb.startDate.getTime() / 1000)}:R>)\n**${gawDb.ended ? 'Ended At' : 'Time'}**: <t:${Math.floor(gawDb.endDate.getTime() / 1000)}:D> (<t:${Math.floor(gawDb.endDate.getTime() / 1000)}:R>)\n**Host**: <@${gawDb.hostId}>\n**Deleted**: ${gawDb.deleted === true ? 'Yes' : 'No'}\n**ID**: ${gawDb.id}`
    }
    
    message.channel.sendMessage({ content: ' ', embeds: [embed] })
  }
}