import * as path from 'path'
import * as fs from 'fs'

const directoryPath = path.join('.github', 'workflows')

export const findExistingLabels = () => {
  let labelerFiles: string[] = []
  const listFiles = (
    directoryPath: string,
    filter: RegExp,
    callback: (a: string) => void
  ) => {
    if (!fs.existsSync(directoryPath)) {
      console.log('no dir ', directoryPath)
      return
    }

    let files = fs.readdirSync(directoryPath)
    for (let i = 0; i < files.length; i++) {
      let filename = path.join(directoryPath, files[i])
      let stat = fs.lstatSync(filename)
      if (stat.isDirectory()) {
        listFiles(filename, filter, callback) //recurse
      } else if (filter.test(filename)) callback(filename)
    }
  }

  const callbackFunction = (filename: string) => labelerFiles.push(filename)
  listFiles(directoryPath, /\.*\-labeler.yml$|\.*\-labeler.yaml$/, callbackFunction)
  return labelerFiles
}
