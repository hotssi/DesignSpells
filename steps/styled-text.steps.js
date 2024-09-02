const { defineFeature, loadFeature } = require('jest-cucumber')
const { Client, GatewayIntentBits } = require('discord.js')
const { jest, beforeAll, expect } = require('jest')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

// Add a step definition file that links to your feature file:
const feature = loadFeature('features/styled-text.feature')

// Add a Jest test for each scenario into your step definition file:
defineFeature(feature, test => {
  let client
  let response

  beforeAll(() => {
    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    })
    // Mock the bot's login to simulate it being online
    client.login = jest.fn().mockResolvedValue('mocked-token')
  })

  test('User tries to make an image of styled text', ({ given, when, then }) => {
    given('the bot is online and operational', async () => {
      await client.login()
      expect(client.login).toHaveBeenCalled()
    })

    when('I selects classification of typeface and font family with text input', async () => {
      // Simulate sending the command to the bot
      const command = '!textEffect shadow bold "Your Text Here"'
      response = await simulateCommand(command)
    })

    then('the bot should return a message within a png image of text', () => {
      // Assert that the bot's response is a PNG image
      const actualImagePath = path.join(__dirname, 'actualImage.png')
      fs.writeFileSync(actualImagePath, response) // Save the response to a file for inspection
      // Here you would typically compare the actual image to an expected image
      // For simplicity, let's just check that the file exists and is a PNG
      const actualImage = fs.readFileSync(actualImagePath)
      assert.ok(actualImage)
      assert.strictEqual(actualImage.slice(0, 8).toString('hex'), '89504e470d0a1a0a') // PNG file signature
    })
  })
})

async function simulateCommand (command) {
  // Simulate the bot's response to the command
  // This function should call the actual bot command handler and return the response
  // For example:
  const [effect, ...text] = command.split(' ')
  const textEffect = require('../src/utils/textEffect') // Adjust the path as needed
  return textEffect(effect, text.join(' '))
}
