import * as inquirer from 'inquirer'

import { getLicenses } from './licenseFunctions'
import { createLicenseFile } from './createLicense'
import { findExistingDefaultLicenseTemplate } from '../license'

export const checkLicense = async () => {
  const availableLicensesData = await getLicenses()
  const licensesNames: string[] = availableLicensesData.data.map(license => license.name)

  licensesNames.splice(licensesNames.indexOf('MIT License'), 1)
  licensesNames.unshift('MIT License')

  const licenseFiles = findExistingDefaultLicenseTemplate()
  const isLicenseFileInProject = licenseFiles.length > 0

  if (isLicenseFileInProject) {
    return inquirer
      .prompt({
        name: 'license-exist',
        type: 'list',
        message: 'License found, Would you like to change License?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(async answer => {
        if (answer['license-exist'] === 'Yes') {
          await createLicenseFile(licensesNames, availableLicensesData.data, 'update')
        }
      })
  } else {
    return inquirer
      .prompt({
        name: 'license-default',
        type: 'list',
        message:
          'You don`t have a License file attached to project, Would you like to generate it?',
        choices: ['Yes', 'No'],
        default: 'Yes',
        suffix: '\n(ctrl + c to exit)'
      })
      .then(async answer => {
        if (answer['license-default'] === 'Yes') {
          await createLicenseFile(licensesNames, availableLicensesData.data, 'generate')
        }
      })
  }
}
