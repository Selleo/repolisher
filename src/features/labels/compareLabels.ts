import * as jsdiff from 'diff'
import * as colors from 'colors/'

export const compareLabels = (file: string, newTemplate: string, _equal: boolean) => {
  const diff = jsdiff.diffChars(file, newTemplate)

  diff.forEach(part => {
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey'

    if (color !== 'grey') _equal = false

    process.stdout.write(colors[color](part.value))
  })
  return _equal
}
