import { request } from '@octokit/request'

import { licenseApi } from './licenseApi'
import {
  LicenseResponseInterface,
  LicenseType,
  ResponseInterface,
  AnswerType
} from './models'

export const getLicenses: () => Promise<ResponseInterface> = async () =>
  await request(`GET ${licenseApi}`, {}).then(response => response)

export const findLicenseKey: (licenses: LicenseType[], answer: AnswerType) => string = (
  licenses,
  answer
) => {
  const selectedLicenseKey = licenses.filter(
    license => license.name === answer['create-license']
  )
  return selectedLicenseKey[0].key
}

export const getLicenseText: (
  licenseKey: string
) => Promise<LicenseResponseInterface> = async licenseKey => {
  return await request(`GET ${licenseApi}/${licenseKey}`, {}).then(response => response)
}
