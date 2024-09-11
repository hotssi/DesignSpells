const getPaginationComponents = require('../helpers/getPaginationComponents')
const fontData = require('../../data/font.json')

module.exports = {
  name: 'interactionCreate',
  async execute (interaction) {
    if (!interaction.isCommand()) return

    if (interaction.commandName === 'styled-text') {
      const textInput = interaction.options.getString('text_input')
      const lang = interaction.options.getString('language')
      const category = interaction.options.getString('category')

      const currentPage = 0
      const MAX_SELECT_ITEMS = 25
      const paginationComp = getPaginationComponents(
        currentPage, MAX_SELECT_ITEMS, fontData[lang][category],
        `styled-text_${textInput}`, `${textInput}_${lang}_${category}`, '서체를 선택 해 주세요.'
      )

      await interaction.reply({
        components: paginationComp
      })
    }
  },

  async autocomplete (interaction) {
    if (!interaction.isAutocomplete()) return
    if (interaction.commandName === 'styled-text') {
      const focusedValue = interaction.options.getFocused()
      const choices = []

      const language = interaction.options.getString('language')
      if (language === 'english') {
        for (const key in fontData.english) {
          choices.push(key)
        }
      } else if (language === 'korean') {
        for (const key in fontData.korean) {
          choices.push(key)
        }
      }

      const filtered = choices.filter(choice => choice.startsWith(focusedValue))
      await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice }))
      )
    }
  }
}
