export const roleFunctions = {
  setRoleName: async function(server, roleId, name) {
    server.editRole({ role_id: roleId, name: name })
  },
  setRoleColor: async function(server, roleId, hex) {
    let name = server.roles[roleId].name
    server.editRole({ role_id: roleId, name: name, colour: hex })
  },
  removeRoleColor: async function(server, roleId) {
    let name = server.roles[roleId].name
    server.editRole({ role_id: roleId, name: name, remove: "Colour" })
  },
  setRoleHoist: async function(server, roleId, boolean) {
    let name = server.roles[roleId].name
    server.editRole({ role_id: roleId, name: name, hoist: boolean })
  },
  setRoleRank: async function(server, roleId, rank) {
    let name = server.roles[roleId].name
    let r = parseInt(rank)
    server.editRole({ role_id: roleId, name: name, rank: r })
  }
}