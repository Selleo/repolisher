import { expect, test } from '@oclif/test'
import * as inquirer from 'inquirer'
import * as glob from 'glob'
import * as fs from 'fs'
import * as child_process from 'child_process'
const sinon = require('sinon')

describe('rome-defaults', () => {
  sinon.stub(inquirer, 'prompt').returns(Promise.resolve({ 'rome-defaults': 'Yes' }))
  sinon.stub(glob, 'sync').callsFake(() => [])
  sinon.stub(fs, 'readFileSync').callsFake(() => '')
  sinon.stub(child_process, 'exec').yields(undefined)

  test
    .stdout()
    .command(['rome-defaults'])
    .it('Prints table with statuses and list options', ctx => {
      expect(ctx.stdout).to.contain('Files generated successfully')
    })
})
