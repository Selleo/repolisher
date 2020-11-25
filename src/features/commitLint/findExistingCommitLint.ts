const DotJson = require('dot-json')

export const findExistingCommitLint = () => {
  const packageJson = new DotJson('package.json')

  const huskyVer: string | undefined =
    packageJson.get('devDependencies.husky') || packageJson.get('dependencies.husky')
  const commitLintCliVer: string | undefined =
    packageJson.get('devDependencies')['@commitlint/cli'] ||
    packageJson.get('dependencies')['@commitlint/cli']
  const commitLintConfigVer: string | undefined =
    packageJson.get('devDependencies')['@commitlint/config-conventional'] ||
    packageJson.get('dependencies')['@commitlint/config-conventional']

  const hook = packageJson.get('husky.hooks.commit-msg')

  const isLatest =
    commitLintCliVer && commitLintConfigVer && hook === 'commitlint -E HUSKY_GIT_PARAMS'

  return {
    exists: !!hook,
    huskyVer,
    huskyExists: !!huskyVer,
    commitLintCliExists: !!commitLintCliVer,
    commitLintConfigExists: !!commitLintConfigVer,
    isLatest,
    name: 'commit-lint',
    path: 'package.json',
    type: 'commit-lint' as const
  }
}
