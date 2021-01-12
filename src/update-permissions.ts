import { Guild, GuildChannel, Role } from "discord.js"
import { getGroupNumber } from './utils'

export default (guild : Guild) => {
    const groups: {[key: number]: Role} = {}

    guild.roles.cache
    .filter(r => /Groupe/.test(r.name))
    .forEach(r => groups[getGroupNumber(r)] = r)

    Object.keys(groups).forEach(group => console.log(`Groupe ${group} has id ${groups[parseInt(group)].id}`))

    guild.channels.cache
    .filter(c => c.type == 'category')
    .filter(c => /Groupe/.test(c.name))
    .sort((a, b) => getGroupNumber(a) - getGroupNumber(b))
    // @ts-ignore
    .forEach((channel: CategoryChannel) => {
        const number = getGroupNumber(channel)
        const reason = "correction des permissions le groupe" + number

        console.log(reason)
        
        channel.children.forEach((c: GuildChannel) => {
            c.lockPermissions()
        })

        channel.overwritePermissions([
            {
                id: groups[number],
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MOVE_MEMBERS']
            },
            {
                id: guild.roles.everyone.id,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }
        ], reason)
    })
}