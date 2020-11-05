import {expect, test} from '@oclif/test'

describe('rome-defaults', () => {
  test
  .stdout()
  .command(['rome-defaults'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['rome-defaults', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
