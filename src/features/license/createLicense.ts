import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as path from 'path'

import { findLicenseKey, getLicenses, getLicenseText } from './licenseFunctions'

type Mode = 'create' | 'update'

export const createLicenseFile = async (mode: Mode, filePath?: string) => {
  const availableLicensesData = await getLicenses()
  const licensesNames: string[] = availableLicensesData.data.map(license => license.name)

  licensesNames.splice(licensesNames.indexOf('MIT License'), 1)
  licensesNames.unshift('MIT License')

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
      const licenseKey: string = findLicenseKey(availableLicensesData.data, answer)
      const licenseText = await (await getLicenseText(licenseKey)).data.body
      const writePath = filePath || path.join('LICENSE.md')

      fs.writeFile(writePath, licenseText, 'utf-8', err => {
        return err
          ? console.log(`Error: ${err}`)
          : console.log(`License file ${mode}d successfully`)
      })
    })
}
