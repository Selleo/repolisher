import { expect, test } from '@oclif/test'
import * as inquirer from 'inquirer'
import * as glob from 'glob'
const sinon = require('sinon')

describe('update', () => {
  const inquirerStub = sinon
    .stub(inquirer, 'prompt')
    .returns(Promise.resolve({ update: [] }))
  sinon.stub(glob, 'sync').callsFake(() => [])

  test
    .stdout()
    .command(['update'])
    .it('Prints table with statuses and list options', ctx => {
      expect(ctx.stdout).to.contain('merge-labeler')
      expect(ctx.stdout).to.contain('qa-labeler')
      expect(ctx.stdout).to.contain('review-labeler')
      expect(ctx.stdout).to.contain('pr-template')
      expect(ctx.stdout).to.contain('default-issue-template')
      expect(ctx.stdout).to.contain('license')

      const options = inquirerStub.args[0][0]['choices'].map(
        ({ name }: { name: string }) => name
      )

      expect(options).to.have.all.members([
        'Merging labels - When pull requests are closed [ready to merge]',
        'Quality assurance action labels - Pull requests to branch master [QA needed],[FEATURE BRANCH]',
        'Review needed label - Pull request to branch staging [review me]',
        'Create PR template',
        'Create Default Issue Template',
        'Create license file'
      ])
    })
})
