import {BaseManager, NewsChannel, Snowflake, TextChannel} from 'discord.js'
import { ApplicationCommand, Interaction, InteractionResponse, InteractionType, InteractionResponseType } from './commands'
import { Client } from './Client'
import CommandInteraction from './CommandInteraction'

/**
 * Manages API methods for Commands and stores their cache
 */
export default class CommandManager {
    client: Client

    constructor(client: Client) {
        this.client = client
    }

    register(command: ApplicationCommand) {
        // @ts-ignore there is no types for api calls as their are not officially supported
        return this.client.api.applications(this.client.user.id).commands.post({data: command})
    }

    onInteration(handler: (interaction: CommandInteraction) => InteractionResponse | Promise<void | InteractionResponse>) {
        // @ts-ignore INTERACTION_CREATE is not supported for the moment
        this.client.ws.on('INTERACTION_CREATE', async (interaction: Interaction) => {
            if (interaction.type === InteractionType.Ping) {
                return this._respond(interaction, InteractionResponse.Pong)
            }

            const guild = this.client.guilds.resolve(interaction.guild_id)
            const channel = this.client.channels.resolve(interaction.channel_id) as TextChannel | NewsChannel
            const member = guild.members.resolve(interaction.member)
            
            const response = await handler(new CommandInteraction(this.client, guild, channel, member, interaction))

            if (response) this._respond(interaction, response)
            else this._respond(interaction, InteractionResponse.Ack)
        })
    }

    private _respond(interaction: Interaction, response: InteractionResponse) {
        console.log(response.type)
        // @ts-ignore there is no types for api calls as their are not officially supported
        this.client.api.interactions(interaction.id, interaction.token).callback.post({data: response})
    }
}