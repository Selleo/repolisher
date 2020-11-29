import { exec } from 'child_process'

const DotJson = require('dot-json')

export const createCommitLint = (
  huskyExists: boolean,
  commitLintCliExists: boolean,
  commitLintConfigExists: boolean
) => {
  const packageJson = new DotJson('package.json')

  if (!commitLintCliExists || !commitLintConfigExists || !huskyExists) {
    const packages: string[] = []
    !huskyExists && packages.push('husky')
    !commitLintCliExists && packages.push('@commitlint/cli')
    !commitLintConfigExists && packages.push('@commitlint/config-conventional')

    console.log(`Installing required packages...`)
    exec(`npm i -D ${packages.join(' ')}`, null, (error, stdout, stderr) => {
      if (error) {
        console.error(`Installation failed: ${error}`)
        return
      }
      console.log(`Successfully installed packages ${packages.join(', ')}`)
      packageJson.set('husky.hooks.commit-msg', 'commitlint -E HUSKY_GIT_PARAMS').save()
      console.log('Commit lint git hook set succesfully')
    })
  } else {
    packageJson.set('husky.hooks.commit-msg', 'commitlint -E HUSKY_GIT_PARAMS').save()
    console.log('Commit lint git hook set succesfully')
  }
}
