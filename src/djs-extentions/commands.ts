import { GuildMember, Snowflake } from "discord.js"
import { type } from "os"
import {AllowedMentions} from './types'


export const ApplicationCommandOptionType = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
} as const

export type ApplicationCommandOptionType = 
    typeof ApplicationCommandOptionType.SUB_COMMAND |
    typeof ApplicationCommandOptionType.SUB_COMMAND_GROUP |
    typeof ApplicationCommandOptionType.STRING |
    typeof ApplicationCommandOptionType.INTEGER |
    typeof ApplicationCommandOptionType.BOOLEAN |
    typeof ApplicationCommandOptionType.USER |
    typeof ApplicationCommandOptionType.CHANNEL |
    typeof ApplicationCommandOptionType.ROLE

export type ApplicationCommandOptionChoice = {
    name: string,
    value: string,
}

type ApplicationCommandOptionBase = {
    name: string,
    description: string,
    default?: boolean,
    required?: boolean,
}

type ApplicationCommandOptionSubCommand = ApplicationCommandOptionBase & {
    type: typeof ApplicationCommandOptionType.SUB_COMMAND | typeof ApplicationCommandOptionType.SUB_COMMAND_GROUP,
    options: ApplicationCommandOption[],
}

type ApplicationCommandOptionCustom = ApplicationCommandOptionBase & {
    type: typeof ApplicationCommandOptionType.STRING | typeof ApplicationCommandOptionType.INTEGER,
    choices?: ApplicationCommandOptionChoice[],
}

type ApplicationCommandOptionOther = ApplicationCommandOptionBase & {
    type: typeof ApplicationCommandOptionType.BOOLEAN | typeof ApplicationCommandOptionType.USER |
            typeof ApplicationCommandOptionType.CHANNEL | typeof ApplicationCommandOptionType.ROLE,
}


export type ApplicationCommandOption = ApplicationCommandOptionSubCommand
    | ApplicationCommandOptionCustom
    | ApplicationCommandOptionOther


export type ApplicationCommand = {
    name: string,
    description: string,
    options?: ApplicationCommandOption[]
}

export const InteractionType = {
    Ping: 1,
    ApplicationCommand: 2,
} as const

export type InteractionType = typeof InteractionType.Ping | typeof InteractionType.ApplicationCommand

export type ApplicationCommandInteractionDataOption = {
    /**
     * the name of the parameter
     */
    name: string,
    /**
     * the value of the pair
     */
    value?: string,
    /**
     * 	present if this option is a group or subcommand
     */
    options?: ApplicationCommandInteractionDataOption[]
}

export type ApplicationCommandInteractionData = {
    /**
     * the ID of the invoked command
     */
    id: Snowflake,
    /**
     * the name of the invoked command
     */
    name: string,
    /**
     * 	the params + values from the user
     */
    options?: ApplicationCommandInteractionDataOption[]
}

export type Interaction = {
    id: Snowflake,
    type: InteractionType,
    data?: ApplicationCommandInteractionData,
    guild_id: Snowflake,
    channel_id: Snowflake,
    member: GuildMember,
    token: string,
    vertion: 1,
}

export {
    ApplicationCommand as Command,
    ApplicationCommandOptionType as OptionTypes
}


export const InteractionResponseType = {
    /**
     * ACK a Ping
     */
    Pong: 1,
    /**
     * ACK a command without sending a message, eating the user's input
     */
    Acknowledge: 2,
    /**
     * respond with a message, eating the user's input
     */
    ChannelMessage: 3,
    /**
     * 	respond with a message, showing the user's input
     */
    ChannelMessageWithSource: 4,
    /**
     * ACK a command without sending a message, showing the user's input
     */
    AcknowledgeWithSource: 5,
}

type InteractionResponseType =
    typeof InteractionResponseType.Pong |
    typeof InteractionResponseType.Acknowledge |
    typeof InteractionResponseType.ChannelMessage |
    typeof InteractionResponseType.ChannelMessageWithSource |
    typeof InteractionResponseType.AcknowledgeWithSource

export type InteractionApplicationCommandCallbackData = {
    tts?: boolean,
    content: string,
    embeds?: any, // flemme
    allowed_mentions?: AllowedMentions,
}

export type InteractionResponse = {
    type: InteractionResponseType,
    data?: InteractionApplicationCommandCallbackData,
}

export const InteractionResponse = {
    Pong: {type: InteractionResponseType.Pong},
    Ack: {type: InteractionResponseType.Acknowledge},
    AckSrc: {type: InteractionResponseType.AcknowledgeWithSource},
    ChannelMessage: (data: InteractionApplicationCommandCallbackData) => ({type: InteractionResponseType.ChannelMessage, data}),
    ChannelMessageSrc: (data: InteractionApplicationCommandCallbackData) => ({type: InteractionResponseType.ChannelMessageWithSource, data}),
} as const