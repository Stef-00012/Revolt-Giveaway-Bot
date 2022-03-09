import pkg from 'mongoose'
const { Schema, model } = pkg

const gawSchema = new Schema({
  _category: { type: String, default: 'Giveaway'},
  serverId: { type: String, default: '0', req: true },
  id: { type: String, default: '0', req: true },
  prize: { type: String, default: '', req: true },
  channelId: { type: String, default: '0', req: true },
  winners: { type: Number, default: '1' },
  startDate: { type: Date, default: new Date(new Date().getTime()) },
  endDate: { type: Date, default: new Date(new Date().getTime() + 86400000) },
  hostId: { type: String, default: '0' },
  partecipantIds: { type: Array, default: [], },
  ended: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false }
})

export const gaw = model('gaw', gawSchema)