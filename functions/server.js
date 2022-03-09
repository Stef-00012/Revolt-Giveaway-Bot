export const serverFunctions = {
  setName: async function (server, name) {
    server.edit({ name: name })
  },
  setDescription: async function (server, desc) {
    server.edit({ description: desc })
  },
  removeDescription: async function (server) {
    server.edit({ remove: "Description" })
  },
  setIcon: async function (server, icon) {
    server.edit({ icon: icon })
  },
  removeIcon: async function (server) {
    server.edit({ remove: "Icon" })
  },
  setBanner: async function (server, banner) {
    server.edit({ banner: banner })
  },
  removeBanner: async function (server) {
    server.edit({ remove: "Banner" })
  },
  setJoinChannel: async function (server, channelId) {
    server.system_messages.user_joined = channelId
    server.edit({ system_messages: server.system_messages })
  },
  setLeaveChannel: async function (server) {
    server.system_messages.user_left = channelId
    server.edit({ system_messages: server.system_messages })
  },
  setKickChannel: async function (server) {
    server.system_messages.user_kicked = channelId
    server.edit({ system_messages: server.system_messages })
  },
  setBanChannel: async function (server) {
    server.system_messages.user_banned = channelId
    server.edit({ system_messages: server.system_messages })
  },
  setNsfw: async function (server, boolean) {
    server.edit({ nsfw: boolean })
  }
}