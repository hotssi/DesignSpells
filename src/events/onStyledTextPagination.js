const getPaginationComponents = require('../helpers/getPaginationComponents')
const fontData = require('../../data/font.json')
const MAX_SELECT_ITEMS = 25

module.exports = {
  name: 'interactionCreate',
  async execute (interaction) {
    if (!interaction.isButton()) return
    const [textInput, lang, category, action, page] = interaction.customId.split('_')
    let currentPage = parseInt(page, 10)

    if (action === 'next') currentPage++
    else if (action === 'prev') currentPage--

    const paginationComp = getPaginationComponents(
      currentPage, MAX_SELECT_ITEMS, fontData[lang][category],
      `styled-text_${textInput}`, `${textInput}_${lang}_${category}`, '서체를 선택 해 주세요.'
    )

    await interaction.update({
      components: paginationComp
    })
  }
}
