import ms from 'ms'
export const command = {
  name: 'gedit',
  category: 'Giveaway',
  showHelp: true,
  aliases: ['giveaway-edit'],
  description: 'Edits an ongoing giveaway giveaway',
  utilisation: '{prefix}gedit <giveaway id> <type> <amount>',
  run: async function(client, message, args) {
    const id = args[0]
    const type = args[1].toLowerCase()
    const amount = args[2]
    if (!id) return message.channel.sendMessage('Please specify a giveaway id')
    let gawDb = await client.schemas.gaw.findOne({ serverId: message.server._id, id: id })
    if (!gawDb) return message.channel.sendMessage('I couldn\'t find a giveaeay with this id')
    if (gawDb.endDate.getTime() <= new Date().getTime() || gawDb.ended || gawDb.deleted) return message.channel.sendMessage(`this giveaway (\`${id}\`) is already already ended or has been deleted`)
    if (!type || !['time', 'winner', 'winners'].includes(type)) return message.channel.sendMessage(`You must edit either time or winners count`)
    if (!amount) return message.channel.sendMessage(`You must specify either time or winners count`)
    const embed = {
      type: 'Text',
      description: `$\\Large\\textsf{Giveaway!}$\n**${gawDb.prize}**`
    }
    
    switch (type) {
      case 'time': {
        gawDb.endDate = amount.startsWith('-') ? new Date(gawDb.endDate.getTime() - ms(amount.replace('-', ''))) : new Date(gawDb.endDate.getTime() + ms(amount.replace('+', '')))
        embed.description += `\n\n**Time**: <t:${Math.floor(gawDb.endDate.getTime() / 1000)}:R>`
        embed.description += `\n**Winners**: ${gawDb.winners}`
      break;
      }
      case 'winners': {
        gawDb.winners = parseInt(amount)
        embed.description += `\n\n**Time**: <t:${Math.floor(gawDb.endDate.getTime() / 1000)}:R>`
        embed.description += `\n**Winners**: ${gawDb.winners}`
      break;
      }
    }
    embed.description += `\n**Host**: <@${message.author_id}>`
    embed.description += `\n\nGiveaway ID: \`${id}\``
    gawDb.save()
    let msg = client.messages.get(gawDb.id)
    try {
     msg.edit({ content: ' ', embeds: [embed] })
    } catch (e) {
      client.req('PATCH', `/channels/${schema.channelId}/messages/${schema.id}`, { content: ' ', embeds: [embed] })
    }
    
    message.channel.sendMessage(`Successfully edited the giveaway with id \`${id}\``)
  }
}