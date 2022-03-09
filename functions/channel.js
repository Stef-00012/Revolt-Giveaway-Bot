export const channelFunctions = {
  setName: async function(client, channelId, name) {
    let channel = client.channels.get(channelId)
    channel.edit({ name: name })
  },
  setDescription: async function(client, channelId, desc) {
    let channel = client.channels.get(channelId)
    channel.edit({ description: desc })
  },
  removeDescription: async function(client, channelId) {
    let channel = client.channels.get(channelId)
    channel.edit({ remove: "Description"})
  },
  setIcon: async function(client, channelId, icon) {
    let channel = client.channels.get(channelId)
    channel.edit({ icon: icon })
  },
  removeIcon: async function(client, channelId) {
    let channel = client.channels.get(channelId)
    channel.edit({ remove: "Icon" })
  },
  setNsfw: async function(client, channelId, boolean) {
    let channel = client.channels.get(channelId)
    channel.edit({ nsfw: boolean })
  }
}