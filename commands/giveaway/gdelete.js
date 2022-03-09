export const command = {
  name: 'gdelete',
  category: 'Giveaway',
  showHelp: true,
  aliases: ['giveaway-delete'],
  description: 'Deletes an ongoing giveaway',
  utilisation: '{prefix}gdelete <giveaway id>',
  run: async function(client, message, args) {
    const id = args[0]
    if (!id) return message.channel.sendMessage('Please specify a giveaway id')
    let gawDb = await client.schemas.gaw.findOne({ serverId: message.server._id, id: id })
    if (!gawDb) return message.channel.sendMessage('I couldn\'t find this giveaway')
    if (gawDb.endDate.getTime() <= new Date().getTime() || gawDb.ended) return message.channel.sendMessage(`this giveaway (\`${id}\`) is already already ended`)
    
    client.req('DELETE', `/channels/${gawDb.channelId}/messages/${gawDb.id}`)
    gawDb.deleted = true
    gawDb.save()
    
    message.channel.sendMessage(`Successfully deleted the giveaway with id \`${id}\``)
  }
}