import ms from 'ms'
export const command = {
  name: 'gcreate',
  category: 'Giveaway',
  showHelp: true,
  aliases: ['giveaway-create'],
  description: 'Start a new giveaway',
  utilisation: '{prefix}gcreate <channel> <winner count> <time> <prize>',
  run: async function(client, message, args) {
    //!gcreate channel win_count time prize
    if (!args[0]) return message.channel.sendMessage('Please specify thr channel giveaway will be in')
    if (!client.channels.get(args[0].replace('<#', '').replace('>', ''))) return message.channel.sendMessage(`Please specify a valid channel`)
    if (!args[1]) return message.channel.sendMessage('Please specify the amount of winners')
    if (!parseInt(args[1]) || parseInt(args[0] <= 0)) return message.channel.sendMessage('Please specify a valid winner count')
    if (!args[2]) return message.channel.sendMessage('Please specify giveaway\'s time')
    if (!parseInt(args[2])) return message.channel.sendMessage('Please specify a valid duration')
    if (parseInt(args[2]) <= 0) return message.channel.sendMessage('Giveaway time must be higher than 0')
    const endDate = new Date(new Date().getTime() + ms(args[2]))
    
    //if (endDate.getTime() <= new Date().getTime()) return message.channel.sendMessage(`Giveaway time must be after this moment`)
    if (!args[3]) return message.channel.sendMessage('Please specify giveaway\'s prize')
    const channel = args[0]
    const winners = parseInt(args[1])
    
    const time = ms(args[2])
    
    const prize = args.splice(3).join(' ')
    const embed1 = {
      type: 'Text',
      description: `$\\Large\\textsf{Giveaway!}$\n**${prize}**\n\n**Time**: <t:${Math.floor(endDate.getTime() / 1000)}:R>\n**Winners**: ${winners}\n**Host**: <@${message.author_id}>`
    }
    
    const gawCh = client.channels.get(channel.replace('<#', '').replace('>', '')) || message.channel
    const sent = await gawCh.sendMessage({ content: ' ', embeds: [embed1] })
    const embed2 = {
      type: 'Text',
      description: `$\\Large\\textsf{Giveaway!}$\n**${prize}**\n\n**Time**: <t:${Math.floor(endDate.getTime() / 1000)}:R>\n**Winners**: ${winners}\n**Host**: <@${message.author_id}>\n\nGiveaway ID:\`${sent._id}\``
    }
    await sent.edit({ content: ' ', embeds: [embed2] })
    
    let gawDb = await client.schemas.gaw.findOne({ serverId: message.server._id, id: sent._id})
    if (!gawDb) {
      gawDb = new client.schemas.gaw({
        serverId: message.server._id,
        id: sent._id,
        prize: prize,
        channelId: gawCh._id,
        winners: winners,
        startDate: new Date(),
        endDate: endDate,
        hostId: message.author_id,
        joinedIds: []
      })
    }
    gawDb.save()
    
    message.channel.sendMessage(`Successfully created the giveaway in ${channel}`)
  }
}