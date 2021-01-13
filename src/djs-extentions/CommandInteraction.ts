import { Base, Guild, GuildMember, NewsChannel, TextChannel } from "discord.js";
import { Client } from "./Client";
import { ApplicationCommandInteractionData, Interaction } from "./commands";

export default class CommandInteraction extends Base {
    guild: Guild
    channel: TextChannel | NewsChannel
    member: GuildMember
    data?: ApplicationCommandInteractionData;

    constructor(client: Client, guild: Guild, channel: TextChannel | NewsChannel, member: GuildMember, data: Interaction) {
        super(client)

        this.guild = guild
        this.channel = channel
        this.member = member
        this.data = data.data
    }
}