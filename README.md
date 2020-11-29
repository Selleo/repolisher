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
repolisher/0.1.0 darwin-x64 node-v12.16.3
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
![repolicher_check_3](https://user-images.githubusercontent.com/48966657/88813500-4aa98500-d1b9-11ea-9ffa-bf8e6a509814.gif)

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

## `repolisher init`

```
USAGE
  $ repolisher init
```
![repolisher_init_3](https://user-images.githubusercontent.com/48966657/88813504-4d0bdf00-d1b9-11ea-9b62-5a619ced3973.gif)

## `repolisher labels`

```
USAGE
  $ repolisher labels
```
![repolisher_labels_3](https://user-images.githubusercontent.com/48966657/88812893-8728b100-d1b8-11ea-87aa-cd6ec51d6c7a.gif)

## `repolisher license`

```
USAGE
  $ repolisher license
```

![repolisher_license_3](https://user-images.githubusercontent.com/48966657/88812900-8a23a180-d1b8-11ea-8938-ac30d83b0f74.gif)

## `repolisher template-issue-default`

```
USAGE
  $ repolisher template-issue-default
```

![repolisher_issue_3](https://user-images.githubusercontent.com/48966657/88812917-90198280-d1b8-11ea-9857-918b9db52148.gif)

## `repolisher template-pr`

```
USAGE
  $ repolisher template-pr
```

![repolisher_pr_template_3](https://user-images.githubusercontent.com/48966657/88812908-8c85fb80-d1b8-11ea-809a-819cfe6ecdae.gif)

## `repolisher commit-lint`

```
USAGE
  $ repolisher commit-lint
```

![repolisher_commit_lint](https://user-images.githubusercontent.com/25669684/100544384-921e4b80-3255-11eb-9653-3c6f540a2077.gif)
<!-- commandsstop -->

# repolisher

# Testing on development:

1. go to repolisher folder
2. do npm pack
3. npm install -g '/path/to/repolisher.tgz file'
4. repolisher check
