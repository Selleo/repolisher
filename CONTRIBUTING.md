# Contributing to Repolisher

## Prerequisite

Make sure you have globally installed `oclif`. You can check this by running

```
npm -g list --depth 0
```

or, if using yarn

```
yarn global list
```

## Creating new command

```
  oclif command <command-name>
```

Update _oclif.manifest.json_ file

```
  yarn oclif-dev manifest
```

## Running command locally

```
  bin/run <command-name>
```

## GOOD PRACTICES

- In `fs` methods use the `path.join()` method. It joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path

## Emojis

List of supported emojis can be found [here](https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json)

## Commit message guidelines

It is required to follow this [commit message style](https://github.com/conventional-changelog/commitlint).
