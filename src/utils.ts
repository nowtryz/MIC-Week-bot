import { GuildChannel, Role } from "discord.js"

export const getGroupNumber = (channel: GuildChannel | Role) => {
    return parseInt(channel.name.match(/Groupe ([0-9]+)/)[1])
}

export const colorRegex = /^!color (#[0-9a-f]{6})/
export const groupRegex = /Groupe ([0-9]+)/