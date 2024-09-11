const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')

function getPaginatedData (page, pageSize, data) {
  const start = page * pageSize
  // return data.slice(start, start + pageSize)
  return data.slice(start, start + pageSize).map(item => new StringSelectMenuOptionBuilder()
    .setLabel(item.label)
    .setValue(item.value)
    .setDescription(item.description)
  )
}

function getPaginationComponents (page, pageSize, data, selectMenuCustomId, buttonCustomId, placeholder) {
  const menuOptions = getPaginatedData(page, pageSize, data)

  // Build Select Menu
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(`${selectMenuCustomId}_${page}`)
    .setPlaceholder(placeholder)
    .addOptions(...menuOptions)

  // Build Buttons
  const buttons = [
    new ButtonBuilder()
      .setCustomId(`${buttonCustomId}_prev_${page}`)
      .setLabel('Prev')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === 0),
    new ButtonBuilder()
      .setCustomId(`${buttonCustomId}_next_${page}`)
      .setLabel('Next')
      .setStyle(ButtonStyle.Primary)
      .setDisabled((page + 1) * pageSize >= data.length)
  ]

  const selectMenuRow = new ActionRowBuilder().addComponents(selectMenu) // ending select menus
  const buttonRow = new ActionRowBuilder().addComponents(...buttons) // ending buttons

  return [selectMenuRow, buttonRow]
}

module.exports = getPaginationComponents
