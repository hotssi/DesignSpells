const { Client, GatewayIntentBits, Collection } = require('discord.js')
const config = require('./config.json')
const path = require('path')
const fs = require('fs')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})
client.commands = new Collection()

// 명령어 파일 로드
const commandsPath = path.join(__dirname, 'src/commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file))
  client.commands.set(command.data.name, command)
}

// 이벤트 핸들러 로드
const eventsPath = path.join(__dirname, 'src/events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

client.once('ready', () => {
  const guildId = config.guildId // 사용하려는 서버 ID 입력
  const guild = client.guilds.cache.get(guildId)
  guild.commands.set(client.commands.map(command => command.data))
  console.log(`Logged in as ${client.user.tag}!`)
})

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file))
  client.on(event.name, (...args) => event.execute(...args))
  client.on(event.name, (...args) => event.autocomplete?.(...args))
}

client.login(config.token)
