<p align="center"><img src="https://autumn.revolt.chat/avatars/BQ3Azb6_b3C8Oa3zp9reCt-M8SArFSQ4nO46YO6N7S/AddText_03-08-10.48.12.png" width="165px" height="165px"></p>
<h1 align="center">Giveaway Bot</h1>

<h2>Download</h2>
<h4>• Clone the repository</h4>

```bash
git clone https://github.com/Stef-00012/Revolt-Giveaway-Bot.git
```

<h4>• install the required modules</h4>

```bash
npm i
```

<h4>• fill in the token and mongo uri in the `config.js`</h4>

Token: your bot's token

Uri: your MongoDB url

<h4>• start the bot</h4>

```bash
npm start
```
or
```bash
node --experimental-specifier-resolution=node index.js
```

<h2>Commands</h2>

Command | Description
------- | -----------
Help    | Gives informations about the commands
Gcreate | Creates a giveaway
Gdelete | Deletes specified giveaeay
Gedit   | Edits specified giveaway's time or winners
Gend    | Ends specified giveaway
Ginfo   | Fives informations about specified giveaway
Gjoin   | Lets the user join specified giveaway
Eval    | Runs given code (owner only)
