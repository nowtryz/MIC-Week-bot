import {Client as DClient, ClientOptions } from 'discord.js'
import CommandManager from './CommandsManager'

export class Client extends DClient {
    commands: CommandManager
    
    constructor(options?: ClientOptions) {
        super(options)
        this.commands = new CommandManager(this)
    }
}