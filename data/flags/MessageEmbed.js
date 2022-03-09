import { Colors } from './Constants.js'
import axios from 'axios'

const descriptionS = '       '
const fieldS = '      '
const footerS = ' $\\large\\textsf{•}$'
const timestampS = '    '

export class MessageEmbed {
  constructor(data = {}) {
    this.setup(data)
  }
  
  setup(data) {
    this.type = data.type ?? "Text"
    this.icon_url = data.icon ?? null
    this.url = data.url ?? null
    this.title = data.title ?? null
    this.description = data.description ?? null
    this.media = data.media ?? null
    this.colour = data.color ?? "#4D4D4D"
    this.client = data.client ?? null
  }
  
  getType() {
    return this.type;
  }
  
  getIcon() {
    return this.icon_url;
  }
  
  getUrl() {
    return this.url;
  }
  
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  
  getMedia() {
    return this.media;
  }
  
  getColor() {
    return this.colour;
  }
  
  length() {
    return (
      (this.title?.length ?? 0) + (this.description?.length ?? 0)
    )
  }
  
  equals(embed) {
    return (
      this.type === embed.type &&
      this.icon_url === embed.icon_url &&
      this.url === embed.url &&
      this.title === embed.title &&
      this.description === embed.description &&
      this.media === embed.media &&
      this.colour === embed.colour
    )
  }
  
  getClient() {
    return this.client;
  }
  
  addField(name, value) {
    let field = `${'\n$\\Large\\textsf{'+name+'}$\n$\\normalsize\\textsf{'+value+'}$'+fieldS}`
    if (this.description.includes(fieldS)) {
      let strArr = this.description.split(fieldS)
      strArr[0] = strArr[0] + field
      this.description = strArr.join(fieldS)
    } else {
    this.description = this.description + field
    }
    return this;
  }
  
  setTimestamp(timestamp = new Date()) {
    let ts;
    if (timestamp instanceof Date) ts = `${timestamp.toLocaleDateString()}`
    if (this.description.endsWith(footerS)) this.description = this.description + `${' $\\footnotesize\\textsf{'+ts+'}$'+timestampS}`
    return this;
  }
  
  setFooter(text) {
    this.description = this.description + `${'\n$\\footnotesize\\textsf{'+text+'}$'+footerS}`
    return this;
  }
  
  setType(type) {
    this.type = typeof type === 'string' ? type : "Text"
    return this;
  }
  
  setIcon(icon) {
    this.icon_url = typeof icon === 'string' ? icon : null
    return this;
  }
  
  setUrl(url) {
    this.url = typeof url === 'string' ? url : null
    return this;
  }
  
  setTitle(title) {
    this.title = typeof title === 'string' ? title : null
    return this;
  }
  
  setDescription(description) {
    this.description = typeof description === 'string' ? `${'$\\small\\textsf{'+description+'}$'+descriptionS}` : null
    return this;
  }
  
  setMedia(media) {
    this.media = typeof media === 'string' ? media : null
  }
  
  setColor(color) {
    let col = color
    if (color === 'RANDOM') col = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
    if (color === 'DEFAULT') col = "#4D4D4D"
    this.colour = col ? col : "#4D4D4D"
    return this;
  }
  
  setClient(client) {
    this.client = client;
    return this;
  }
  
  toJSON() {
    return {
      type: this.type,
      icon_url: this.icon_url,
      url: this.url,
      title: this.title,
      description: this.description,
      media: this.media,
      colour: this.colour
    }
  }
}