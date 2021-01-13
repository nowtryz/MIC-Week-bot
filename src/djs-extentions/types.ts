import { Snowflake } from "discord.js"

export type User = {
    id: Snowflake,
    username: string,
    discriminator: string,
    avatar: string,
    bot?: boolean,
    system?: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: string,
    email?: string,
    flags?: number,
    premium_type?: number,
    public_flags?: number,
}

export type GuildMember = {
    user: User,
    nick?: string,
    roles: Snowflake[],
    joined_at: string,
    premium_since?: string,
    deaf: boolean,
    mute: string,
    pending?:boolean,
}

export const Mentions = {
    /**
     * Controls role mentions
     */
    Roles: "roles",
    /**
     * 	Controls user mentions
     */
    Users: "users",
    /**
     * 	Controls @everyone and @here mentions
     */
    Everyone: "everyone"
} as const

export type Mentions = typeof Mentions.Roles | typeof Mentions.Users | typeof Mentions.Everyone

export type AllowedMentions = {
    parse?: Mentions[],
    roles?: Snowflake[],
    users?: Snowflake[],
    replied_user?: boolean
}