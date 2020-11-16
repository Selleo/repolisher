import * as fs from 'fs'
import * as emoji from 'node-emoji'

export const checkIfFileIsLatestVersion = (file1: string, file2: string): boolean => {
  const file1Content = fs.readFileSync(file1, 'utf8')
  const file2Content = fs.readFileSync(file2, 'utf8')

  return file1Content === file2Content
}

export const booleanToEmoji = (value: boolean): string =>
  value ? emoji.get('white_check_mark') : emoji.get('x')
