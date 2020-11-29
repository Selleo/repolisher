import * as fs from 'fs'
import * as emoji from 'node-emoji'
import * as jsdiff from 'diff'
import * as colors from 'colors/'

export const checkIfFileIsLatestVersion = (file1: string, file2: string): boolean => {
  const file1Content = fs.readFileSync(file1, 'utf8')
  const file2Content = fs.readFileSync(file2, 'utf8')

  return file1Content === file2Content
}

export const booleanToEmoji = (value: boolean): string =>
  value ? emoji.get('white_check_mark') : emoji.get('x')

export function compareTextWithDiff(
  file: string,
  newTemplate: string,
  showDiff: boolean = false
) {
  const actualTemplate = fs.readFileSync(file, 'utf-8')
  const diff = jsdiff.diffChars(newTemplate, actualTemplate)

  if (showDiff) {
    diff.forEach(part => {
      const color = part.added ? 'green' : part.removed ? 'red' : 'grey'

      process.stdout.write(colors[color](part.value))
    })
  }

  return newTemplate === actualTemplate
}
