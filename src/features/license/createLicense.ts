import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as path from 'path'

import { findLicenseKey, getLicenseText } from './licenseFunctions'
import { LicenseType } from './models'

export const createLicenseFile: (
  licensesNames: string[],
  licenses: LicenseType[],
  mode: 'generate' | 'update'
) => void = async (licensesNames, licenses, mode) => {
  await inquirer
    .prompt({
      name: 'create-license',
      type: 'rawlist',
      message: 'Choose type of license that you want to attach to project',
      choices: [...licensesNames],
      default: licensesNames[0],
      suffix: '\n(ctrl + c to exit)'
    })
    .then(async answer => {
      const licenseKey: string = findLicenseKey(licenses, answer)
      const licenseText = await (await getLicenseText(licenseKey)).data.body
      const text = mode === 'generate' ? 'generated' : 'updated'
      fs.writeFile(path.join('LICENSE.md'), licenseText, 'utf-8', err => {
        return err
          ? console.log(`Error: ${err}`)
          : console.log(`License file ${text} successfully`)
      })
    })
}
