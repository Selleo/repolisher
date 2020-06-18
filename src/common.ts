import * as jsdiff from 'diff'
import * as colors from 'colors/'
import * as fs from 'fs'
import * as glob from 'glob'
import * as inquirer from 'inquirer'

export function compareTemplates(file: string, newTemplate: string, _equal: boolean) {
  const actualTemplate = fs.readFileSync(file, 'utf-8')
  const diff = jsdiff.diffChars(actualTemplate, newTemplate)

  diff.forEach(part => {
    const color = part.added ? 'green' :
      part.removed ? 'red' : 'grey'

    if (color !== 'grey')
      _equal = false

    process.stdout.write(colors[color](part.value))
  })
  return _equal
}

export const checkPRTemplate = () => {
  let equal = true
  let pr_template_exists = false
  const templatePath = `${__dirname}/files/PULL_REQUEST_TEMPLATE.md`

  if (!fs.existsSync(templatePath)) {
    return console.log('PR Template file is missing')
  }
  const newTemplate = fs.readFileSync(templatePath, 'utf-8')
  glob.sync('**/PULL_REQUEST_TEMPLATE.md').forEach(file => {
    pr_template_exists = true

    console.log('You already have PR template in Your repository')
    equal = compareTemplates(file, newTemplate, equal)

    if (equal)
      return console.log('No changes between actual and new template')

    return inquirer.prompt({
      name: 'template-pr',
      type: 'list',
      message: 'Would You like to update a pull request template?',
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)',
    }).then(answer => {
      if (answer['template-pr'] === 'Yes') {
        fs.writeFile('PULL_REQUEST_TEMPLATE.md', newTemplate, 'utf-8', err => {
          return err ? console.log(`Error: ${err}`) : console.log('PR template updated successfully')
        })
      }
    })
  })

  if (!pr_template_exists) {
    return inquirer.prompt({
      name: 'template-pr',
      type: 'list',
      message: 'You don`t have a Pull Request Template, Would You like to generate it?',
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)',
    }).then(answer => {
      if (answer['template-pr'] === 'Yes') {
        fs.writeFile('PULL_REQUEST_TEMPLATE.md', newTemplate, 'utf-8', err => {
          return err ? console.log(`Error: ${err}`) : console.log('PR template generated successfully')
        })
      }
    })
  }
}
