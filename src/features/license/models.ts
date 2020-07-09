export interface LicenseType {
  key: string
  name: string
  spdx_id: string
  url: string
  node_id: number
}

export interface ResponseInterface {
  data: LicenseType[]
}

export interface LicenseResponseInterface {
  data: {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
    html_url: string
    description: string
    implementation: string
    permissions: 'commercial-use' | 'modifications' | 'distribution' | 'private-use'
    conditions: 'include-copyright'
    limitations: 'liability' | 'warranty'
    body: string
    featured: false
  }
}

export interface AnswerType {
  'create-license': string
}
