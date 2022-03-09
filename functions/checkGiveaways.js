import { writeFileSync } from 'fs'
export async function checkGiveaways(client, time) {
  setInterval(async () => {
    let schemas = await client.schemas.gaw.find({ _category: 'Giveaway' })
    if (!schemas || schemas.length === 0) return;
    schemas.forEach(async (schemaa) => {
      const schema = await client.schemas.gaw.findOne({ serverId: schemaa.serverId, id: schemaa.id})
      if (schema.endDate.getTime() <= new Date().getTime() && !schema.ended && !schema.deleted) {
        schema.ended = true
        const endEmbedNoWinners = {
          type: 'Text',
          description: `$\\Large\\textsf{Ended Giveaway!}$\n**${schema.prize}**\n\n**Ended At**: <t:${Math.floor(schema.endDate.getTime() / 1000)}:R>\n**Winners**: There weren't enough partecipants (${schema.partecipantIds.length}/${schema.winners})`
        }
        const message = await client.messages.get(schema.id) || await client.req('GET', `/channels/${schema.channelId}/messages/${schema.id}`)
        
        const chan = client.channels.get(schema.channelId)
        if (schema.partecipantIds.length < schema.winners) {
          try {
            client.req('PATCH', `/channels/${schema.channelId}/messages/${schema.id}`, { content: ' ', embeds: [endEmbedNoWinners] })
            return;
          } catch (e) {
            schema.ended = false
            console.log(e)
            return;
          }
        }
        const winners = []
        for (let i = 0; i < schema.winners; i++) {
          let winner = schema.partecipantIds[Math.floor(Math.random() * schema.partecipantIds.length)]
          if (winners.includes(winner)) winner = schema.partecipantIds[Math.floor(Math.random() * schema.partecipantIds.length)]
          winners.push(winner)
        }
        
        const endEmbed = {
          type: 'Text',
          description: `$\\Large\\textsf{Ended Giveaway!}$\n**${schema.prize}**\n\n**Ended At**: <t:${Math.floor(schema.endDate.getTime() / 1000)}:R>\n**Winners**: <@${winners.join('>', '<@')}>`
        }
        try {
          client.req('PATCH', `/channels/${schema.channelId}/messages/${schema.id}`, { content: `Congratulations to the winners:\n<@${winners.join('>', '<@')}>!`, embeds: [endEmbed] })
        } catch (e) {
         schema.ended = false
         console.log(e)
         return;
        }
        try {
          chan?.sendMessage({ content: `Congratulations to the winners:\n<@${winners.join('>', '<@')}>!\nClick [here](https://app.revolt.chat/server/${schema.serverId}/channel/${schema.channelId}/${schema.id}) for go to the giveaeay`, replies: [{ id: schema.id, mention: false }] }).catch(() => {
            client.req('POST', `/channels/${chan.id}/messages`, { content: `Congratulations to the winners:\n<@${winners.join('>', '<@')}>!\nClick [here](https://app.revolt.chat/server/${schema.serverId}/channel/${schema.channelId}/${schema.id}) for go to the giveaeay`, replies: [{ id: schema.id, mention: false }] })
          })
        } catch (e) {
          schema.ended = false
          console.log(e)
          return;
        }
      }
      schema.save()
    })
  }, time)
}