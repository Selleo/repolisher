import { labelNamesTranslations } from './labelNamesTranslations';

export type LabelsNames = keyof typeof labelNamesTranslations

export type LabelStatus = {
  exists: boolean
  isLatest: boolean
  name: LabelsNames
  path?: string
  type: 'labels-actions'
}
