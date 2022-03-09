export const command = {
  name: 'help',
  category: 'Misc',
  showHelp: true,
  aliases: [],
  description: 'Shows avaible commands or information about a command',
  utilisation: '{prefix}help [command]',
  run: async function(client, message, args) {
    if (!args[0]) {
      const embed = {
        type: 'Text',
        description: `$\\Large\\textsf{Help}$\n<> = required | [] = optional\n\n$\\large\\textsf{Giveaway - ${client.commands.filter(x => x.showHelp && x.category === 'Giveaway').map(x => x).length}}$\n${client.commands.filter(x => x.showHelp && x.category === 'Giveaway').map(x => `\`${x.name}\`${x.aliases[0] ? ` (${x.aliases.map(y => `\`${y}\``).join(', ')})` : ''}`).join(', ')}\n$\\large\\textsf{Misc - ${client.commands.filter(x => x.showHelp && x.category === 'Misc').map(x => x).length}}$\n${client.commands.filter(x => x.showHelp && x.category === 'Misc').map(x => `\`${x.name}\`${x.aliases[0] ? ` (${x.aliases.map(y => `\`${y}\``).join(', ')})` : ''}`).join(', ')}`
      }
      message.channel.sendMessage({ content: ' ', embeds: [embed] })
    } else {
      const px = '.'
      const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))
      if (!command) return message.channel.sendMessage('I couldn\'t find this command')
      const embed = {
        type: 'Text',
        description: `$\\Large\\textsf{Help - ${command.name}}$\n<> = required | [] = optional\n\n**Name**: ${command.name}\n**Category**: ${command.category}\n**Description**: ${command.description}\n**Utilisation**: ${command.utilisation.replace('{prefix}', px)}\n**Aliases**: ${command.aliases.length > 0 ? `\`${command.aliases.join('`, `')}\`` : 'None'}`
      }
      message.channel.sendMessage({ content: ' ', embeds: [embed] })
    }
  }
}