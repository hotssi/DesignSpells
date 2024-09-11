const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('styled-text')
    .setDescription('원하는 폰트가 적용된 텍스트의 이미지를 생성합니다.')
    .addStringOption(option =>
      option.setName('text_input')
        .setDescription('내용 입력')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('language')
        .setDescription('렌더링할 텍스트의 언어를 설정 해 주세요.')
        .setRequired(true)
        .addChoices(
          { name: 'english', value: 'english' },
          { name: 'korean', value: 'korean' }
        )
    )
    .addStringOption(option =>
      option.setName('category')
        .setDescription('서체의 카테고리를 선택 해 주세요.')
        .setRequired(true)
        .setAutocomplete(true)
    )
}
