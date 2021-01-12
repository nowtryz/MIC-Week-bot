import {CategoryChannel, Collection, Client, Permissions, Guild, GuildChannel, Role} from 'discord.js'
import {config} from 'dotenv'
import {convertToRGB} from './color'
import { getGroupNumber, groupRegex, colorRegex } from './utils'

config()
const client = new Client()


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const guild = await client.guilds.fetch(process.env.GUILD_ID)

    client.user.setStatus('idle')
    client.user.setActivity({
        type: 'PLAYING',
        name: '!color pour changer la couleur de votre groupe'
    })

    const groups: {[key: number]: Role} = {}

    guild.roles.cache
    .filter(r => /Groupe/.test(r.name))
    .forEach(r => groups[getGroupNumber(r)] = r)

    client.on('message', async message => {
        if (message.channel.type === 'text' && colorRegex.test(message.content)) {
            const hex = message.content.match(colorRegex)[1]
            const color = convertToRGB(hex)
            const match = message.channel.parent?.name.match(groupRegex)
    
            if (match) {
                const number = getGroupNumber(message.channel.parent)
                const group = groups[number]
                group.setColor(color)
                message.channel.send(`La couleur du groupe <@&${group.id}> a été changé en \`${hex}\``)
            }
        }
    })
});

client.login(process.env.BOT_TOKEN)
