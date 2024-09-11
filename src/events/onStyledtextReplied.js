const { AttachmentBuilder } = require('discord.js')
const iconv = require('iconv-lite')
const path = require('path')
const fs = require('fs')
const textEffect = require('../utils/textEffect')

module.exports = {
  name: 'interactionCreate',
  async execute (interaction) {
    if (!interaction.isStringSelectMenu()) return
    const [customId, textInput] = interaction.customId.split('_') // 페이지 분리 필요

    if (customId === 'styled-text') {
      const fontName = interaction.values[0]
      const selectedOption = interaction.component.options.find(option => option.value === fontName)
      const fontPath = iconv.encode(selectedOption.description, 'utf-8') // 선택된 옵션의 디스크립션. 폰트의 절대 경로가 포함되어 있음.

      const effect = 'shadow'
      // const userInput = interaction.options.getString('text_input')
      const imageCachePath = path.join(__dirname, '../../cache/output.png')
      textEffect(fontPath, effect, textInput, imageCachePath)

      // 저장된 이미지 파일을 전송
      const file = new AttachmentBuilder(imageCachePath)

      // 1. 즉시 응답 대기 상태를 설정(최대 15분까지 시간 연장)
      await interaction.deferReply()

      // 2. 처리 완료 후 결과 전송(deferReply로 응답을 대기시킨 후 편집)
      await interaction.editReply({
        content: `${fontName} 서체가 선택되었습니다.`,
        files: [file]
      })

      // 임시 파일 삭제
      fs.unlinkSync(imageCachePath)
    }
  }
}
