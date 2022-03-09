export const command = {
  name: 'gjoin',
  category: 'Giveaway',
  showHelp: true,
  aliases: ['giveaway-join'],
  description: 'Join an ongoing giveaway giveaway',
  utilisation: '{prefix}gcreate <uud>',
  run: async function(client, message, args) {
    const id = args[0]
    if (!id) return message.channel.sendMessage('Please specify a giveaway id')
    const gawDb = await client.schemas.gaw.findOne({ serverId: message.server._id, id: id })
    
    if (!gawDb) return message.channel.sendMessage('I couldn\'t find this giveaway')
    
    if (gawDb.partecipantIds.includes(message.author_id)) return message.channel.sendMessage('You are already in this giveaway')
    if (gawDb.endDate.getTime() <= new Date().getTime() || gawDb.ended || gawDb.deleted) return message.channel.sendMessage(`this giveaway (\`${id}\`) is already already ended or has been deleted`)
    gawDb.partecipantIds.push(message.author_id)
    gawDb.save()
    message.channel.sendMessage(`Successfully joined this giveaway (\`${gawDb.id}\`)`)
  }
}