# repolisher

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/repolisher.svg)](https://npmjs.org/package/repolisher)
[![Downloads/week](https://img.shields.io/npm/dw/repolisher.svg)](https://npmjs.org/package/repolisher)
[![License](https://img.shields.io/npm/l/repolisher.svg)](https://github.com/RobertMrowiec/repolisher/blob/master/package.json)

<!-- toc -->
* [repolisher](#repolisher)
* [Usage](#usage)
* [Commands](#commands)
* [repolisher](#repolisher-1)
* [Testing on development:](#testing-on-development)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g repolisher
$ repolisher COMMAND
running command...
$ repolisher (-v|--version|version)
repolisher/0.0.15 darwin-x64 node-v12.16.3
$ repolisher --help [COMMAND]
USAGE
  $ repolisher COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`repolisher check`](#repolisher-check)
* [`repolisher help [COMMAND]`](#repolisher-help-command)
* [`repolisher init`](#repolisher-init)
* [`repolisher labels`](#repolisher-labels)
* [`repolisher license`](#repolisher-license)
* [`repolisher template-issue-default`](#repolisher-template-issue-default)
* [`repolisher template-pr`](#repolisher-template-pr)

## `repolisher check`

```
USAGE
  $ repolisher check
```

_See code: [src/commands/check.ts](https://github.com/Selleo/repolisher/blob/v0.0.15/src/commands/check.ts)_

## `repolisher help [COMMAND]`

display help for repolisher

```
USAGE
  $ repolisher help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `repolisher init`

```
USAGE
  $ repolisher init
```

_See code: [src/commands/init.ts](https://github.com/Selleo/repolisher/blob/v0.0.15/src/commands/init.ts)_

## `repolisher labels`

```
USAGE
  $ repolisher labels
```

_See code: [src/commands/labels.ts](https://github.com/Selleo/repolisher/blob/v0.0.15/src/commands/labels.ts)_

## `repolisher license`

```
USAGE
  $ repolisher license
```

_See code: [src/commands/license.ts](https://github.com/Selleo/repolisher/blob/v0.0.15/src/commands/license.ts)_

## `repolisher template-issue-default`

```
USAGE
  $ repolisher template-issue-default
```

_See code: [src/commands/template-issue-default.ts](https://github.com/Selleo/repolisher/blob/v0.0.15/src/commands/template-issue-default.ts)_

## `repolisher template-pr`

```
USAGE
  $ repolisher template-pr
```

_See code: [src/commands/template-pr.ts](https://github.com/Selleo/repolisher/blob/v0.0.15/src/commands/template-pr.ts)_
<!-- commandsstop -->

# repolisher

# Testing on development:

1. go to repolisher folder
2. do npm pack
3. npm install -g '/path/to/repolisher.tgz file'
4. repolisher check
