import { expect, test } from '@oclif/test'
import rewiremock from 'rewiremock'
import * as inquirer from 'inquirer'
import * as child_process from 'child_process'

const sinon = require('sinon')
const _ = require('lodash')

describe('commit-lint', () => {
  sinon.stub(inquirer, 'prompt').returns(Promise.resolve({ 'commit-lint': 'Yes' }))
  sinon.stub(child_process, 'exec').yields(undefined)
  describe('when is up to date', () => {
    before(() => {
      const dotJsonStub = sinon
        .stub()
        .returns({ get: (path: string) => _.get(mockPackageJson.latest, path) })

      rewiremock(() => require('dot-json')).with(dotJsonStub)
      rewiremock.enable()
    })

    after(() => {
      rewiremock.disable()
    })

    test
      .stdout()
      .command(['commit-lint'])
      .it('prints status message', ctx => {
        expect(ctx.stdout).to.contain('Your commit lint git hook is up to date')
      })
  })

  describe('when husky version is < 1.x', () => {
    before(() => {
      const dotJsonStub = sinon
        .stub()
        .returns({ get: (path: string) => _.get(mockPackageJson.huskyLow, path) })

      rewiremock(() => require('dot-json')).with(dotJsonStub)
      rewiremock.enable()
    })

    after(() => {
      rewiremock.disable()
    })

    test
      .stdout()
      .command(['commit-lint'])
      .it('prints status message', ctx => {
        expect(ctx.stdout).to.contain('Please upgrade your husky version to 4.x')
      })
  })

  describe('when missing files', () => {
    before(() => {
      const dotJsonStub = sinon.stub().returns({
        get: (path: string) => _.get(mockPackageJson.empty, path),
        set: () => ({ save: () => {} })
      })

      rewiremock(() => require('dot-json')).with(dotJsonStub)
      rewiremock.enable()
    })

    after(() => {
      rewiremock.disable()
    })

    test
      .stdout()
      .command(['commit-lint'])
      .it('install required packages, add git hook and print success message', ctx => {
        expect(ctx.stdout).to.contain('Commit lint git hook set succesfully')
      })
  })

  describe('when missing hook', () => {
    before(() => {
      const dotJsonStub = sinon.stub().returns({
        get: (path: string) => _.get(mockPackageJson.empty, path),
        set: () => ({ save: () => {} })
      })

      rewiremock(() => require('dot-json')).with(dotJsonStub)
      rewiremock.enable()
    })

    after(() => {
      rewiremock.disable()
    })

    test
      .stdout()
      .command(['commit-lint'])
      .it('add hook and prints success message', ctx => {
        expect(ctx.stdout).to.contain('Commit lint git hook set succesfully')
      })
  })
})

const mockPackageJson = {
  latest: {
    devDependencies: {
      husky: '^3.0.3',
      '@commitlint/cli': '^2.0.0',
      '@commitlint/config-conventional': '^3.0.0'
    },
    husky: {
      hooks: {
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
      }
    }
  },
  huskyLow: {
    devDependencies: {
      husky: '^0.0.3',
      '@commitlint/cli': '^2.0.0',
      '@commitlint/config-conventional': '^3.0.0'
    }
  },
  empty: {
    devDependencies: {
      '@commitlint/cli': '^2.0.0',
      '@commitlint/config-conventional': '^3.0.0'
    }
  },
  missingHook: {
    devDependencies: {
      husky: '^3.0.3',
      '@commitlint/cli': '^2.0.0',
      '@commitlint/config-conventional': '^3.0.0'
    }
  }
}
