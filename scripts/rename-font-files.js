const fs = require('fs')
const path = require('path')
const fontkit = require('fontkit')

function renameFontFiles (directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err)
      return
    }

    files.forEach(file => {
      const filePath = path.join(directory, file)
      if (file.endsWith('.ttf') || file.endsWith('.otf')) {
        const font = fontkit.openSync(filePath)
        const originalName = font.fullName || font.familyName
        const newFileName = `${originalName}${path.extname(file)}`
        const newFilePath = path.join(directory, newFileName)

        fs.rename(filePath, newFilePath, err => {
          if (err) {
            console.error('Error renaming file:', err)
          } else {
            console.log(`Renamed ${file} to ${newFileName}`)
          }
        })
      }
    })
  })
}

// 폰트 파일이 있는 디렉토리 경로를 지정하세요
const directoryPath = './assets/font/korean/decorative'
renameFontFiles(directoryPath)
