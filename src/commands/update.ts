import { Command } from '@oclif/command'
import * as Table from 'cli-table3'
import * as inquirer from 'inquirer'
import { capitalize } from 'lodash'

import {
  findExistingDefaultIssueTemplate,
  createIssueTemplate
} from '../features/issueTemplate'
import { findExistingLabels, labelNamesTranslations, addLabel } from '../features/labels'
import { LabelsNames } from '../features/labels/models'
import {
  findExistingDefaultLicenseTemplate,
  createLicenseFile
} from '../features/license'
import { findExistingPRTemplate, createPrTemplate } from '../features/prTemplate'
import { booleanToEmoji } from '../utils/utils'

export default class Update extends Command {
  async run() {
    const issueTemplate = findExistingDefaultIssueTemplate()
    const prTemplate = findExistingPRTemplate()
    const license = findExistingDefaultLicenseTemplate()
    const labels = findExistingLabels()

    const statuses = new Table({ head: ['name', 'exists', 'latest'] })
    const grouppedData = [...labels, prTemplate, issueTemplate]
    grouppedData.forEach(label =>
      statuses.push([
        label.name,
        booleanToEmoji(label.exists),
        booleanToEmoji(label.isLatest)
      ])
    )
    statuses.push([license.name, booleanToEmoji(license.exists), 'N/A'])

    console.log(statuses.toString())

    const choices = [...labels, prTemplate, issueTemplate, license]
      .map(status => {
        const { exists, type, isLatest, name, path } = status
        if (exists && isLatest) return null

        const mode = exists ? 'update' : 'create'

        if (type === 'labels-actions') {
          return {
            name: labelNamesTranslations[name as LabelsNames],
            value: name,
            callback: () => addLabel(mode, name, path)
          }
        }
        if (type === 'pr-template') {
          return {
            name: `${capitalize(mode)} PR template`,
            value: 'pr-template',
            callback: () => createPrTemplate(mode, path)
          }
        }
        if (type === 'issue-template') {
          return {
            name: `${capitalize(mode)} Default Issue Template`,
            value: 'issue-template',
            callback: () => createIssueTemplate(mode, path)
          }
        }
        if (type === 'license') {
          return {
            name: `${capitalize(mode)} license file`,
            value: 'license',
            callback: () => createLicenseFile(mode, path)
          }
        }
      })
      .filter(notEmpty)

    await inquirer
      .prompt({
        choices: choices,
        message: 'Choose to what workflow you want add labels',
        name: 'update',
        suffix: '\n(ctrl + c to exit)',
        type: 'checkbox'
      })
      .then(answer => {
        const pickedChoicesArr = answer['update']
        pickedChoicesArr.forEach((pickedChoice: string) => {
          const selectedLabel = choices.find(({ value }) => value === pickedChoice)
          selectedLabel?.callback()
        })
      })
  }
}

// https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}
