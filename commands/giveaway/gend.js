export const command = {
  name: 'gend',
  category: 'Giveaway',
  showHelp: true,
  aliases: ['giveaway-end'],
  description: 'Ends an ongoing giveaway',
  utilisation: '{prefix}gend <giveaway id>',
  run: async function(client, message, args) {
    const id = args[0]
    if (!id) return message.channel.sendMessage('Please specify a giveaway id')
    const gawDb = await client.schemas.gaw.findOne({ serverId: message.server._id, id: id })
    if (!gawDb) return message.channel.sendMessage('I couldn\'t find this giveaway')
    if (gawDb.endDate.getTime() <= new Date().getTime() || gawDb.ended || gawDb.deleted) return message.channel.sendMessage(`this giveaway (\`${id}\`) is already already ended`)
    gawDb.endDate = new Date()
    gawDb.save()
    message.channel.sendMessage(`Successfully ended this giveaway (\`${id}\`)\nIt could take up to 15 seconds for get the winners`)
  }
}