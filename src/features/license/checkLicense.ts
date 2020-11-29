import * as inquirer from 'inquirer'

import { getLicenses } from './licenseFunctions'
import { createLicenseFile } from './createLicense'
import { findExistingDefaultLicenseTemplate } from '../license'

export const checkLicense = async () => {
  const licenseFile = findExistingDefaultLicenseTemplate()

  const mode = licenseFile.exists ? 'update' : 'create'
  const message =
    mode === 'create'
      ? 'You don`t have a License file attached to project, Would you like to generate it?'
      : 'License found, Would you like to change License?'

  return inquirer
    .prompt({
      name: 'license-exist',
      type: 'list',
      message,
      choices: ['Yes', 'No'],
      default: 'Yes',
      suffix: '\n(ctrl + c to exit)'
    })
    .then(async answer => {
      if (answer['license-exist'] === 'Yes') {
        await createLicenseFile(mode, licenseFile.path)
      }
    })
}
