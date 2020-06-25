import * as jsdiff from 'diff'
import * as colors from 'colors/'
import * as fs from 'fs'

export function compareTemplates(file: string, newTemplate: string, _equal: boolean) {
  const actualTemplate = fs.readFileSync(file, 'utf-8')
  const diff = jsdiff.diffChars(actualTemplate, newTemplate)

  diff.forEach(part => {
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey'

    if (color !== 'grey') _equal = false

    process.stdout.write(colors[color](part.value))
  })
  return _equal
}
