import { inspect } from 'util'
export const command = {
  name: 'eval',
  ownerOnly: true,
  showHelp: false,
  run: async function(client, message, args) {
    try {
      const returned = eval(args.join(' '));
      
      let str = inspect(returned, { depth: 1 });
      if (str.length > 1900) str = `${str.substr(0, 1897)}...`;
      
      message.channel.sendMessage('```js\n' + str + '\n```');
    } catch (e) {
      message.channel.sendMessage('```js\n' + e + '\n```').catch(() => { })
    };
  }
}