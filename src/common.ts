import * as jsdiff from 'diff'
import * as colors from 'colors/'
import * as fs from 'fs'
import * as glob from 'glob'
import * as inquirer from 'inquirer'
import * as path from 'path'

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

const findExistingPRTemplate = () =>
  glob
    .sync(path.join('.github', 'PULL_REQUEST_TEMPLATE.md'))
    .concat(glob.sync(path.join('docs', 'PULL_REQUEST_TEMPLATE.md')))
    .concat(glob.sync('PULL_REQUEST_TEMPLATE.md'))

const findExistingDefaultIssueTemplate = () =>
  glob
    .sync(path.join('.github', 'issue_template.md'))
    .concat(glob.sync(path.join('docs', 'issue_template.md')))
    .concat(glob.sync(path.join('.github', 'ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync(path.join('docs', 'ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync(path.join('ISSUE_TEMPLATE', 'issue_template.md')))
    .concat(glob.sync('issue_template.md'))

export const checkPRTemplate = () => {
  let equal = true
  let prTemplateExists = false
  const newPullRequestTemplatePath = path.join(
    'src',
    'files',
    'NEW_PULL_REQUEST_TEMPLATE.md'
  )

  if (!fs.existsSync(newPullRequestTemplatePath)) {
    return console.log('PR Template file is missing')
  }
  const newTemplate = fs.readFileSync(newPullRequestTemplatePath, 'utf-8')
  const prTemplates = findExistingPRTemplate()

  prTemplates.forEach(file => {
    prTemplateExists = true

    console.log('You already have PR template in Your repository')
    equal = compareTemplates(file, newTemplate, equal)

    if (equal) return console.log('No changes between actual and new template')

    return inquirer
      .prompt({
        name: 'template-pr',
        type: 'list',
        message: 'Would You like to update a pull request template?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-pr'] === 'Yes') {
          fs.writeFile(file, newTemplate, 'utf-8', err => {
            return err
              ? console.log(`Error: ${err}`)
              : console.log('PR template updated successfully')
          })
        }
      })
  })

  if (!prTemplateExists) {
    return inquirer
      .prompt({
        name: 'template-pr',
        type: 'list',
        message: 'You don`t have a Pull Request Template, Would You like to generate it?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-pr'] === 'Yes') {
          fs.mkdir('.github', { recursive: true }, err => {
            if (err) return console.log(`Error: ${err}`)
          })
          fs.writeFile(
            path.join('.github', 'PULL_REQUEST_TEMPLATE.md'),
            newTemplate,
            'utf-8',
            err => {
              return err
                ? console.log(`Error: ${err}`)
                : console.log('PR template generated successfully')
            }
          )
        }
      })
  }
}

export const checkDefaultIssueTemplate = () => {
  let equal = true
  let defaultIssueTemplateExists = false
  const newDefaultIssueTemplatePath = path.join(
    'src',
    'files',
    'NEW_DEFAULT_ISSUE_TEMPLATE.md'
  )

  if (!fs.existsSync(newDefaultIssueTemplatePath)) {
    return console.log('Default Issue Template file is missing')
  }
  const newTemplate = fs.readFileSync(newDefaultIssueTemplatePath, 'utf-8')
  const issueTemplates = findExistingDefaultIssueTemplate()

  issueTemplates.forEach(file => {
    defaultIssueTemplateExists = true

    console.log('You already have default issue template in Your repository')
    equal = compareTemplates(file, newTemplate, equal)

    if (equal) return console.log('No changes between actual and new template')

    return inquirer
      .prompt({
        name: 'template-issue-default',
        type: 'list',
        message: 'Would You like to update a Default Issue Template?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-issue-default'] === 'Yes') {
          fs.writeFile(file, newTemplate, 'utf-8', err => {
            return err
              ? console.log(`Error: ${err}`)
              : console.log('Default Issue Template updated successfully')
          })
        }
      })
  })

  if (!defaultIssueTemplateExists) {
    return inquirer
      .prompt({
        name: 'template-issue-default',
        type: 'list',
        message:
          'You don`t have a Default Issue Template, Would You like to generate it?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(answer => {
        if (answer['template-issue-default'] === 'Yes') {
          fs.mkdir(path.join('.github', 'ISSUE_TEMPLATE'), { recursive: true }, err => {
            if (err) return console.log(`Error: ${err}`)
          })
          fs.writeFile(
            path.join('.github', 'ISSUE_TEMPLATE', 'issue_template.md'),
            newTemplate,
            'utf-8',
            err => {
              return err
                ? console.log(`Error: ${err}`)
                : console.log('Default Issue Template generated successfully')
            }
          )
        }
      })
  }
}
