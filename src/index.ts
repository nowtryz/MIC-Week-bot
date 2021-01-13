import {Guild, Permissions, Role} from 'discord.js'
import {config} from 'dotenv'
import {convertToRGB} from './color'
import { Client } from './djs-extentions/Client'
import { Command, InteractionResponse, OptionTypes } from './djs-extentions/commands'
import { getGroupNumber, groupRegex, colorRegex } from './utils'

config()
const client = new Client()

const getGroups = (guild: Guild) => {
    const groups: {[key: number]: Role} = {}

    guild.roles.cache
        .filter(r => /Groupe/.test(r.name))
        .forEach(r => groups[getGroupNumber(r)] = r)

    return groups
}


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Bot /color command
    client.commands.register({
        name: "color",
        description: "Change la couleur de ton groupe",
        options: [
            {
                name: "color",
                description: "La nouvelle couleur de ton groupe (hexadécimale, e.g. #ebc12d)",
                required: true,
                type: OptionTypes.STRING,
            }
        ]
    })

    // Bot status
    client.user.setStatus('idle')
    client.user.setActivity({
        type: 'PLAYING',
        name: '/color'
    })
});

// bot new command
client.commands.onInteration(async interaction => {
    if (interaction.data?.name === "color" && interaction.data?.options !== undefined) {
        const value = interaction.data.options[0].value
        console.log(value)

        if(/#[0-9a-f]{6}/i.test(value)) {
            const color = value.toLowerCase().match(/#[0-9a-f]{6}/)[0]
            const match = interaction.channel.parent?.name.match(groupRegex)

            console.log('match')
    
            if (match) {
                const groups = getGroups(interaction.guild)
                const number = getGroupNumber(interaction.channel.parent)
                const group = groups[number]
                group.setColor(color)

                console.log(`Change color to${color} for group ${number}`)
                return InteractionResponse.ChannelMessageSrc({
                    content: `La couleur du groupe <@&${group.id}> a été changée en \`${color}\``
                })
            } else return InteractionResponse.ChannelMessageSrc({
                content: `<@!${interaction.member.id}>, tu dois éxécuter cette commande dans un des salons de ton équipe`
            })
        } else return InteractionResponse.ChannelMessageSrc({
            content: `\`${value}\` n'est pas une couleur correcte`
        })
    }
})

// On join a creation vocal
const prefix = '🔉'

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channel && newState.channel.name.toLocaleLowerCase().includes('créer')) {
        // join
        const newChannel = await newState.guild.channels.create(`${prefix} ${newState.member.nickname || newState.member.displayName}`, {
            type: 'voice',
            parent: newState.channel.parent,
        })

        await newState.member.voice.setChannel(newChannel)
        console.log('Created a voice channel for ' + newState.member.displayName)
    }
    
    if (oldState.channel && oldState.channel.name.startsWith(`${prefix} `) && oldState.channel.members.array().length === 0) {
        await oldState.channel.delete()
        console.log('Deleted ' + oldState.channel.name)
    }
})

client.login(process.env.BOT_TOKEN)
