import FormData from 'form-data';
import axios from 'axios';
import { ulid } from "ulid";
import { ChannelPermission, ServerPermission } from "revolt.js";

const NO_MANAGER_MSG = '🔒 Missing permission';
const ULID_REGEX = /^[0-9A-HJ-KM-NP-TV-Z]{26}$/i;
const USER_MENTION_REGEX = /^<@[0-9A-HJ-KM-NP-TV-Z]{26}>$/i;
const CHANNEL_MENTION_REGEX = /^<#[0-9A-HJ-KM-NP-TV-Z]{26}>$/i;

async function getAutumnURL(client) {
    let autumn_url = null;
    let apiConfig = axios.get(client.apiURL).then(res => {
      autumn_url = (res.data).features.autumn.url;
    });
    return autumn_url || ((await axios.get(client.apiURL)).data).features.autumn.url;
}

/**
 * Parses user input and returns an user object.
 * Supports: `userID`, `<@userID>` (mention), `username`, `@username` (if user is cached).
 */
async function parseUser(client, text) {
    if (!text) return null;

    let uid = null;
    if (USER_MENTION_REGEX.test(text)) {
        uid = text.replace(/<@|>/g, '').toUpperCase();
    } else if (/^[0-9A-HJ-KM-NP-TV-Z]{26}$/gi.test(text)) {
        uid = text.toUpperCase();
    } else {
        if (text.startsWith('@')) text = text.substr(1);

        // Why is there no .find() or .filter()
        let user = null;
        client.users.forEach(u => {
            if (u.username?.toLowerCase() == text.toLowerCase()) {
                user = u;
            }
        });

        if (user) return user;
    }

    try {
        if (uid) return await client.users.fetch(uid) || null;
        else return null;
    } catch(e) { return null; }
}

/**
 * Does the exact same as `parseUser`, but returns only `_id` instead
 * of null if the user was not found and the input is also an ID
 */
async function parseUserOrId(text) {
    let parsed = await parseUser(text);
    if (parsed) return parsed;
    if (ULID_REGEX.test(text)) return { _id: text.toUpperCase() };
    return null;
}

async function isModerator(message) {
    let member = message.member, server = message.channel.server;
    return hasPerm(member, 'KickMembers')
        || await isBotManager(message)
}
async function isBotManager(message) {
    let member = message.member, server = message.channel.server;
    return hasPerm(member, 'ManageServer')
}

function hasPerm(member, perm) {
    let p = ServerPermission[perm];
    if (member.server?.owner == member.user?._id) return true;

    // this should work but im not 100% certain
    let userPerm = member.roles?.map(id => member.server?.roles?.[id]?.permissions?.[0])
        .reduce((sum, cur) => sum | cur, member.server?.default_permissions[0]) ?? 0;

    return !!(userPerm & p);
}

function hasPermForChannel(member, channel, perm) {
    if (!member.server) throw 'hasPermForChannel(): Server is undefined';
    return !!(channel.permission & ChannelPermission[perm]);
}

async function getOwnMemberInServer(client, server) {
    return client.members.getKey({ server: server._id, user: client.user._id })
                          || await server.fetchMember(client.user._id);
}

async function uploadFile(client, file, filename) {
    let data = new FormData();
    data.append("file", file, { filename: filename });

    let req = await axios.post(await getAutumnURL(client) + '/attachments', data, { headers: data.getHeaders() });
    return (req.data)['id'];
}

/**
 * Attempts to escape a message's markdown content (qoutes, headers, **bold** / *italic*, etc)
 */
function sanitizeMessageContent(msg) {
    let str = '';
    for (let line of msg.split('\n')) {

        line = line.trim();

        if (line.startsWith('#')  || // headers
            line.startsWith('>')  || // quotes
            line.startsWith('|')  || // tables
            line.startsWith('*')  || // unordered lists
            line.startsWith('-')  || // ^
            line.startsWith('+')     // ^
        ) {
            line = `\\${line}`;
        }

        // Ordered lists can't be escaped using `\`,
        // so we just put an invisible character \u200b
        if (/^[0-9]+[)\.].*/gi.test(line)) {
            line = `\u200b${line}`;
        }

        for (const char of ['_', '!!', '~', '`', '*', '^', '$']) {
            line = line.replace(new RegExp(`(?<!\\\\)\\${char}`, 'g'), `\\${char}`);
        }

        // Mentions
        line = line.replace(/<@/g, `<\\@`);

        str += line + '\n';
    }

    return str;
}

export {
    getAutumnURL,
    hasPerm,
    hasPermForChannel,
    getOwnMemberInServer,
    isModerator,
    isBotManager,
    parseUser,
    parseUserOrId,
    uploadFile,
    sanitizeMessageContent,
    NO_MANAGER_MSG,
    ULID_REGEX,
    USER_MENTION_REGEX,
    CHANNEL_MENTION_REGEX,
}