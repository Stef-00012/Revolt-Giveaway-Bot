import fetch from 'node-fetch'
import axios from 'axios'
import chalk from 'chalk'
import cheerio from 'cheerio'
import { flip } from '../data/flip.js'
import { tiny } from '../data/tiny.js'
import {bent  } from '../data/bent.js'
import { copy } from '../data/copy.js'
import { words } from '../data/words.js'

export const functions = {
  clean: function(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
  },
  filterTheItems: function(data) {
		const res = {};
		for (const [key, value] of Object.entries(data)) {
			if (value === 0) continue;
			else res[key] = value;
		}

		return res;
	},
	convertBytes: function(x) {
		const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let l = 0;
		let n = parseInt(x, 10) || 0;
		while(n >= 1024 && l++) {
			n = n / 1024;
		}
		return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
	},
	convertSecToTime: function(time) {
		const seconds = time % 1000;
		const minutes = Math.floor((time / 1000)) % 60;
		const hours = Math.floor((time / (60 * 1000))) % 60;
		const days = Math.floor(time / (60 * 1000 * 60 * 24));

		let string = '';

		if(minutes === 0) string = `${seconds}s`;
		if(hours === 0) string = `${minutes}m ${seconds}s`;
		if(days === 0) string = `${days}d ${minutes}m ${seconds}s`;

		return string;
	},
	topCommonElementsInArray: function(nums, maxResults) {
		const hash = {};

		for (const num of nums) {
			if (!hash[num]) hash[num] = 0;
			hash[num]++;
		}

		const hashToArray = Object.entries(hash);
		const sortedArray = hashToArray.sort((a, b) => b[1] - a[1]);

		return sortedArray.slice(0, maxResults);
	},
  isOdd: function(num) {
      return num % 2 != 0;
    },
  isEven: function(num) {
      return num % 2 != 1;
    },
  getUnixTimestamp: function(date) {
        const timestamp = Math.floor(new Date(date).getTime() / 1000)
        return timestamp;
},
  getRandomNumber: function(start, end) {
		const res = Math.floor(Math.random() * (end - start + 1) + start);
		return res;
	},
	randomizeString: function(array) {
		const res = Math.floor(Math.random() * array.length);
		return array[res];
	},
	reverseText: function(string) {
		return string.split('').reverse().join('');
	},
	tinyCapital: function(str) {
		let c = '',
			a;
		str = str.toUpperCase();
		for (let d = 0, e = str.length; d < e; d++) {
			(a = tiny[str.charAt(d)]),
			typeof a == 'undefined' && (a = str.charAt(d)),
			(c += a);
		}
		return c;
	},
	vaporwave: function(string) {
		return string
			.replace(/[a-zA-Z0-9!\?\.'";:\]\[}{\)\(@#\$%\^&\*\-_=\+`~><]/g, (char) =>
				String.fromCharCode(0xfee0 + char.charCodeAt(0)),
			)
			.replace(/ /g, '　');
	},
  bent: function(str) {
		let c = '';
		for (let a, d = 0, e = str.length; d < e; d++) {
			(a = bent[str.charAt(d)]),
			typeof a == 'undefined' && (a = str.charAt(d)),
			(c += a);
		}
		return c;
	},
	flip: function(str) {
		const c = [];
		for (let a, d = 0, e = str.length; d < e; d++) {
			(a = str.charAt(d)),
			d > 0 &&
				(a == '\u0324' || a == '\u0317' || a == '\u0316' || a == '\u032e')
				? ((a = flip[str.charAt(d - 1) + a]), c.pop())
				: ((a = flip[a]), typeof a == 'undefined' && (a = str.charAt(d))),
			c.push(a);
		}
		return c.reverse().join('');
	},
	mirror: function(str) {
		let c = [];
		const d = [];
		for (let a, e = 0, f = str.length; e < f; e++) {
			(a = str.charAt(e)),
			e > 0 &&
				(a == '\u0308' || a == '\u0300' || a == '\u0301' || a == '\u0302')
				? ((a = copy[str.charAt(e - 1) + a]), c.pop())
				: ((a = copy[a]), typeof a == 'undefined' && (a = str.charAt(e))),
			a == '\n' ? (d.push(c.reverse().join('')), (c = [])) : c.push(a);
		}
		d.push(c.reverse().join(''));
		return d.join('\n');
	},
  getRandomCase: function(string) {
		let result = '';
		for (const i in string) {
			const Random = Math.floor(Math.random() * 2);
			result += Random == 1 ? string[i].toLowerCase() : string[i].toUpperCase();
		}
		return result;
	},
  getRandomString: function(length) {
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += randomChars.charAt(
				Math.floor(Math.random() * randomChars.length),
			);
		}
		return result;
	},
	getRandomSentence: function(length) {
		const word = [];
		for (let i = 0; i < length; i++) {
			word.push(words[Math.floor(Math.random() * words.length)]);
		}
		return word;
	},
	shuffleString: function(string) {
		const str = string.split('');
		const length = str.length;
		for (let i = length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const tmp = str[i];
			str[i] = str[j];
			str[j] = tmp;
		}
		return str.join('');
	},
	convertTime: function(time) {
		const absoluteSeconds = Math.floor((time / 1000) % 60);
		const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60);
		const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24);
		const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24));
		const d = absoluteDays
			? absoluteDays === 1
				? '1 day'
				: `${absoluteDays} days`
			: null;
		const h = absoluteHours
			? absoluteHours === 1
				? '1 hour'
				: `${absoluteHours} hours`
			: null;
		const m = absoluteMinutes
			? absoluteMinutes === 1
				? '1 minute'
				: `${absoluteMinutes} minutes`
			: null;
		const s = absoluteSeconds
			? absoluteSeconds === 1
				? '1 second'
				: `${absoluteSeconds} seconds`
			: null;
		const absoluteTime = [];
		if (d) absoluteTime.push(d);
		if (h) absoluteTime.push(h);
		if (m) absoluteTime.push(m);
		if (s) absoluteTime.push(s);
		return absoluteTime.join(', ');
	},
	shuffleArray: function(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	},
	getRandomHexColor: function() {
		return (
			'#' +
			('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
		);
	},
	fetchRobloxApi: async function(type, options = {}) {
	  if (type == 'getUserRobloxBadges') {
	    return fetch(`https://accountinformation.roblox.com/v1/users/${options.userId}/roblox-badges`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getAvatar') {
	    return fetch(`https://avatar.roblox.com/v1/users/${options.userId}/avatar`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getBadgeInfo') {
	    return fetch(`https://badges.roblox.com/v1/badges/${options.badgeId}`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserFollowersInfo') {
	    const urls = [`https://friends.roblox.com/v1/users/${options.userId}/followers?limit=10&sortOrder=Asc`, `https://friends.roblox.com/v1/users/${options.userId}/followers?limit=${options.limit}&sortOrder=Asc`];
	    let url;
	    const limits = ['10', '25', '50', '100']
	    limits.forEach(limit => {
	      if (options.limit !== limit) url = urls[0]
	    })
	    if (!options.limit || !parseInt(options.limit)) url = urls[0];
	    if (parseInt(options.limit)) url = urls[1];
	    return fetch(url).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserFollowersCount') {
	    return fetch(`https://friends.roblox.com/v1/users/${options.userId}/followers/count`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserFollowingCount') {
	    return fetch(`https://friends.roblox.com/v1/users/${options.userId}/followings/count`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserFollowingInfo') {
	    const urls = [`https://friends.roblox.com/v1/users/${options.userId}/followings?limit=10&sortOrder=Asc`, `https://friends.roblox.com/v1/users/${options.userId}/followings?limit=${options.limit}&sortOrder=Asc`];
	    let url;
	    const limits = ['10', '25', '50', '100']
	    limits.forEach(limit => {
	      if (options.limit !== limit) url = urls[0]
	    })
	    if (!options.limit || !parseInt(options.limit)) url = url[0];
	    if (parseInt(options.limit)) url = urls[1];
	    return fetch(url).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserFriendsCount') {
	    return fetch(`https://friends.roblox.com/v1/users/${options.userId}/friends/count`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserFriendsInfo') {
	    const userSortTypes = ['Alphabetical', 'StatusFrequents', 'StatusAlphabetical']
	    const urls = [`https://friends.roblox.com/v1/users/${options.userId}/friends?userSort=Alphabetical`, `https://friends.roblox.com/v1/users/${options.userId}/friends?userSort=${options.userSort}`];
	    let url;
	    userSortTypes.forEach(sort => {
	    if (!options.userSort || options.userSort !== sort) url = urls[0];
	    if (options.userSort && options.userSort == sort) url = urls[1];
	    })
	    return fetch(url).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getGameInfo') {
      return fetch(`https://games.roblox.com/v1/games?universeIds=${options.universeId}`).then(res => res.json()).then(json => json)
	  }
	  if (type == 'getUniverseId') {
	    return fetch(`https://api.roblox.com/universes/get-universe-containing-place?placeid=${options.rootId}`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getGroupInfo') {
	    return fetch(`https://groups.roblox.com/v1/groups/${options.groupId}`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserInfo') {
	    return fetch(`https://users.roblox.com/v1/users/${options.userId}`).then(res => res.json()).then(json => json);
	  }
	  if (type == 'getUserUsernameHistory') {
	    const urls = [`https://users.roblox.com/v1/users/${options.userId}/username-history?limit=10&sortOrder=Asc`, `https://users.roblox.com/v1/users/${options.userId}/username-history?limit=${options.limit}&sortOrder=Asc`]
	    let url;
	    const limits = ['10', '25', '50', '100']
	    limits.forEach(limit => {
	      if (options.limit !== limit) url = urls[0]
	    })
	    if (!options.limit || !parseInt(options,limit)) url = urls[0]
	    if (parseInt(options.limit)) url = urls[1]
	    return fetch(url).then(res => res.json()).then(json => json);
	  }
	  if (type == 'searchUser') {
	    const urls = [`https://users.roblox.com/v1/users/search?keyword=${options.userUsername}&limit=10`, `https://users.roblox.com/v1/users/search?keyword=${options.userUsername}&limit=${options.limit}`]
	    let url;
	    const limits = ['10', '25', '50', '100']
	    limits.forEach(limit => {
	      if (options.limit !== limit) url = urls[0]
	    })
	    if (!options.limit || !parseInt(options.limit)) url = urls[0];
	    if (parseInt(options.limit)) url = urls[1];
	    return fetch(url).then(res => res.json()).then(json => json)
	  }
	  if (type = 'getUserRap') {
	    const urls = [`https://inventory.roblox.com/v1/users/${options.userId}/assets/collectibles?sortOrder=Asc&limit=10`, `https://inventory.roblox.com/v1/users/${options.userId}/assets/collectibles?sortOrder=Asc&limit=${options.limit}`]
	    let url;
	    const limits = ['10', '25', '50', '100']
	    limits.forEach(limit => {
	      if (options.limit !== limit) url = urls[0]
	    })
	    if (!options.limit || !parseInt(options.limit)) url = urls[0]
	    if (parseInt(options.limit)) url = urls[1]
	    return fetch(url).then(res => res.json()).then(json => json/*{
	      json.data.reduce((ac, curr) => ac += curr.number, 0)
	    }*/)
	  }
	  if (type == 'getUserPromotions') {
	    return fetch(`https://accountinformation.roblox.com/v1/users/${options.userId}/promotion-channels`).then(res => res.json()).then(json => json)
	  }
	  if (type == 'getUserAvatar') {
	    return fetch(`https://avatar.roblox.com/v1/users/${options.userId}/avatar`).then(res => res.json()).then(json => json)
	  }
	  if (type == 'getUserBadges') {
	    const urls = [`https://badges.roblox.com/v1/users/${options.userId}/badges?limit=10&sortOrder=Asc`, `https://badges.roblox.com/v1/users/${options.userId}/badges?limit=${options.limit}&sortOrder=Asc`]
	    let url;
	    const limits = ['10', '25', '50', '100']
	    limits.forEach(limit => {
	      if (options.limit !== limit) url = urls[0]
	    })
	    if (!options.limit || !parseInt(options.limit)) url = urls[0]
	    if (options.limit && parseInt(options.limit)) url = urls[1]
	    return fetch(url).then(res => res.json()).then(json => json)
	  }
	  if (type == 'getUserBadgesAmount') {
	    const urls = [`https://badges.roblox.com/v1/users/${options.userId}/badges?limit=10&sortOrder=Asc`, `https://badges.roblox.com/v1/users/${options.userId}/badges?limit=${options.limit}&sortOrder=Asc`]
	    let url;
	    const limits = ['10', '25', '50', '100']
	    limits.forEach(limit => {
	      if (options.limit !== limit) url = urls[0]
	    })
	    if (!options.limit || !parseInt(options.limit)) url = urls[0]
	    if (options.limit && parseInt(options.limit)) url = urls[1]
	    return fetch(url).then(res => res.json()).then(json => json.data.length)
	  }
	}
}