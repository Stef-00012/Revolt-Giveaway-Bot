import { Badges } from '../data/flags/Badges.js'

export const event = {
  run: async function(client, message) {
    if (message.author.bot || message.channel.channel_type !== 'TextChannel') return;
    if (message.content.includes('<@01FXQXHH0375K8YRQGPS8HXQRV>')) message.channel.sendMessage(`Hi <@${message.author_id}>! my prefix here is \`${client.config.bot.prefix}\``)
    if (!message.content.startsWith(client.config.bot.prefix)) return;
    try {
      message.member.setNickname = client.mFunctions.setNickname
      message.member.resetNickname = client.mFunctions.removeNickname
      message.member.addRole = client.mFunctions.addRole
      message.member.removeRole = client.mFunctions.removeRole
      message.member.hasPerm = client.util.hasPerm
      message.member.listRoles = client.mFunctions.listRoles
      message.member.hasPermForChannel = client.util.hasPermForChannel
      message.member.isModerator = client.util.isModerator
      message.member.isBotManager = client.util.isBotManager
      
      message.member.server.setName = client.sFunctions.setName
      message.member.server.removeDescription = client.sFunctions.removeDescription
      message.member.server.setDescription = client.sFunctions.setDescription
      message.member.server.setIcon = client.sFunctions.setIcon
      message.member.server.removeIcon = client.sFunctions.removeIcon
      message.member.server.setBanner = client.sFunctions.setBanner
      message.member.server.removeBanner = client.sFunctions.removeBanner
      message.member.server.setJoinChannel = client.sFunctions.setJoinChannel
      message.member.server.setLeaveChannel = client.sFunctions.setLeaveChannel
      message.member.server.setKickChannel = client.sFunctions.setKickChannel
      message.member.server.setBanChannel = client.sFunctions.setBanChannel
      message.member.server.setNsfw = client.sFunctions.setNsfw
      
      message.member.server.setRoleName = client.rFunctions.setRoleName
      message.member.server.setRoleColor = client.rFunctions.setRoleColor
      message.member.server.removeRoleColor = client.rFunctions.removeRoleColor
      message.member.server.setRoleHoist = client.rFunctions.setRoleHoist
      message.member.server.setRoleRank = client.rFunctions.setRoleRank
      
      message.member.server.setChannelName = client.cFunctions.setName
      message.member.server.setChannelDescription = client.cFunctions.setDescription
      message.member.server.removeChannelDescription = client.cFunctions.removeDescription
      message.member.server.setChannelIcon = client.cFunctions.setIcon
      message.member.server.removeChannelIcon = client.cFunctions.removeIcon
      message.member.server.setChannelNsfw = client.cFunctions.setNsfw
      message.member.server.me = client.util.getOwnMemberInServer(client, message.member.server)
      
      message.server = message.member.server
      
      message.channel.setName = client.cFunctions.setName
      message.channel.setDescription = client.cFunctions.setDescription
      message.channel.removeDescription = client.cFunctions.removeDescription
      message.channel.setIcon = client.cFunctions.setIcon
      message.channel.removeIcon = client.cFunctions.removeIcon
      message.channel.setNsfw = client.cFunctions.setNsfw
      
      message.uploadFile = client.util.uploadFile
      message.sanitizeContent = client.util.sanitizeMessageContent
    } catch (e) {}
    
    
    
    try {
      const args = message.content.split(' ').slice(1);
      
      const commandName = message.content.split(' ').shift().toLowerCase().replace(client.config.bot.prefix, '')
      if (commandName.length < 1) return;
      
      const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
      if (!cmd) return
      if (cmd.ownerOnly && message.author_id !== client.config.bot.ownerId) return message.channel.sendMessage('$\\color{#d65c35}\\textsf{This message failed}$')
      cmd.run(client, message, args);
    } catch (e) {
      console.log(`ERROR: ${e}`)
    }
  }
}