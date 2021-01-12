import {Guild} from 'discord.js'

export default async (guild: Guild) => {
    const everyone = guild.roles.everyone
    
    for (let i = 1 ; i < 26 ; i++) {
        
        const cat = await guild.channels.create(`Groupe ${i}`, {
            type: 'category'
        })

        const group = await guild.roles.create({
            data: {
                name: `Groupe ${i}`,
                position: 3 + i,
                mentionable: true,
            },
            reason: 'creation de role pour le groupe ' + i
        })

        cat.overwritePermissions([
            {
                id: group.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MOVE_MEMBERS']
            },
            {
                id: everyone.id,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }
        ])
    }
}