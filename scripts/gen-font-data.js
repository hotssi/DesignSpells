const fs = require('fs')
const path = require('path')

const fontAssetDir = './assets/font' // 프로젝트의 루트 디렉토리 경로를 설정하세요

function getDirectories (srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
}

function getFontFiles (srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isFile()).map(file => path.join(srcPath, file))
}

function getFontArr (srcPath) {
  const fontArr = []
  const fontFiles = getFontFiles(srcPath)

  fontFiles.forEach(fontFile => {
    const fontName = path.parse(fontFile).name
    const buffer = {}
    buffer.label = fontName
    buffer.description = fontFile
    buffer.value = fontName.toLowerCase()
    fontArr.push(buffer)
  })

  return fontArr
}

function buildJsonStructure (basePath) {
  const structure = {}
  const categories = getDirectories(basePath)

  categories.forEach(category => {
    const categoryPath = path.join(basePath, category)
    structure[category] = getFontArr(categoryPath)
  })

  return structure
}

const englishStructure = buildJsonStructure(path.join(fontAssetDir, 'english'))
const koreanStructure = buildJsonStructure(path.join(fontAssetDir, 'korean'))

const finalStructure = {
  english: englishStructure,
  korean: koreanStructure
}

fs.writeFileSync('data/font.json', JSON.stringify(finalStructure, null, 2), 'utf-8')

console.log('JSON 파일이 성공적으로 생성되었습니다.')
