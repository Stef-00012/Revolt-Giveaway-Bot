import { Client } from 'revolt.js'
import fs from 'fs'
import mongoose from 'mongoose'
import { Collection } from 'discord.js'
import { functions } from './functions/function.js'
import { memberFunctions } from './functions/member.js'
import { serverFunctions } from './functions/server.js'
import { roleFunctions } from './functions/role.js'
import { channelFunctions } from './functions/channel.js'
import { Badges } from './data/flags/Badges.js'
import { MessageEmbed } from './data/flags/MessageEmbed.js'
import { getAutumnURL, hasPerm, hasPermForChannel, getOwnMemberInServer, isModerator, isBotManager, parseUser, parseUserOrId, uploadFile, sanitizeMessageContent, NO_MANAGER_MSG, ULID_REGEX, USER_MENTION_REGEX, CHANNEL_MENTION_REGEX } from './functions/revolt.js'
import { checkGiveaways } from './functions/checkGiveaways.js'
import { gaw } from './DB/schemas/gaw.js'
import { config } from './config.js'

export const client = new Client()

client.badges = Badges
client.embed = MessageEmbed
client.config = config
client.util = {
  getAutumnURL: getAutumnURL,
  hasPerm: hasPerm,
  hasPermForChannel: hasPermForChannel,
  getOwnMemberInServer: getOwnMemberInServer,
  isModerator: isModerator,
  isBotManager: isBotManager,
  parseUser: parseUser,
  parseUserOrId: parseUserOrId,
  uploadFile: uploadFile,
  sanitizeMessageContent: sanitizeMessageContent, 
  NO_MANAGER_MSG: NO_MANAGER_MSG,
  ULID_REGEX: ULID_REGEX,
  USER_MENTION_REGEX: USER_MENTION_REGEX,
  CHANNEL_MENTION_REGEX: CHANNEL_MENTION_REGEX
}
client.schemas = {
  gaw: gaw
}

client.commands = new Collection()

client.functions = functions
client.mFunctions = memberFunctions
client.sFunctions = serverFunctions
client.rFunctions = roleFunctions
client.cFunctions = channelFunctions

fs.readdirSync('./commands').forEach(async (dirs) => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
  
  for (const file of commands) {
    const command = await import(`./commands/${dirs}/${file}`)
    console.log(`\x1b[35m[COMMANDS] \x1b[0mLoaded ${command.command.name}`)
    client.commands.set(command.command.name.toLowerCase(), command.command)
  }
})

const events = fs.readdirSync('./events').filter(files => files.endsWith('.js'))

for (const file of events) {
  const event = await import(`./events/${file}`)
  console.log(`\x1b[34m[EVENTS] \x1b[0mLoaded ${file.split('.')[0]}`)
  client.on(file.split('.')[0], event.event.run.bind(null, client))
}

client.loginBot(client.config.bot.token)

mongoose.connect(client.config.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB database successfully connected')
}).catch((err) => {
  console.log(err, 'Unable to connect to MongoDB database')
})

checkGiveaways(client, 15000)