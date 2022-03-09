export const memberFunctions = {
  addRole: async function(client, memberId, roleId) {
    let member = client.req("GET", `/servers/${message.server._id}/members/${memberId}`)
    member.roles.push(roleId)
    client.req("PATCH", `/servers/${message.server._id}/members/${memberId}`, { roles: member.roles })
  },
  removeRole: async function(client, memberId, roleId) {
    let member = client.req("GET", `/servers/${message.server._id}/members/${memberId}`)
    client.req("PATCH", `/servers/${message.server._id}/members/${memberId}`, { roles: member.roles.filter(r => r !== roleId) })
  },
  setNickname: async function(client, memberId, nick) {
    client.req("PATCH", `/servers/${message.server._id}/members/${memberId}`, { nickname: nick })
  },
  removeNickname: async function(client, memberId) {
    client.req("PATCH", `/servers/${message.server._id}/members/${memberId}`, { remove: "Nickname" })
  },
  listRoles: async function(client, memberId) {
    let member = client.req("GET", `/servers/${message.server._id}/members/${memberId}`)
    let arr = member.roles;
    let names = []
    for (let i = 0; i < arr.length; i++) {
      names.push(member.server.roles[member.roles[i]].name)
    }
    return names;
  }
}