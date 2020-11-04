# pino-sanitize

This is a transport for [pinojs logger](https://github.com/pinojs/pino) that sanitizes sensitive data, such as UUID, tokens, and hashes inside some log field.

A standard Pino log line like:

```
{"level":30,"time":1522431328992,"msg":"GET https://mydomain.com/api/v1/users/ca464889-8125-4910-bf4f-da404ad90106  - HTTP Status 200","pid":42,"hostname":"foo","v":1}
```

Will format to:

```
{"level":30,"time":1522431328992,"msg":"GET https://mydomain.com/api/v1/users/:uuid  - HTTP Status 200","pid":42,"hostname":"foo","v":1}
```

## Install

```sh
$ npm install -g pino-sanitize
```

## Usage

> It's recommended to use `pino-sanitize` with `pino` by piping output to the CLI tool:

Thinking you have the `start` script in your `package.json` and you have the package installed globally

```json
{
    ...
    "scripts":{
        ...
        "start": "node yourprocess.js"
    },
    ...
}
```

You can run the transform by running this command in your CLI

```sh
npm run start | pino-sanitize
```

### CLI Arguments

- `--uuid` (`-u`): Filter log removing UUID (defaults to `false`).
- `--hash` (`-h`): Filter log removing HASH (defaults to `false`).
- `--qs` (`-q`): Filter log removing Query Strings (defaults to `false`).
- `--keys` (`-k`): Define which keys should be sanitized (`-k err,msg`) (defaults to `err,error,msg,message`).

## Local development

### Installing dependencies

```
nvm use
npm install
```

### Running the logs sample locally

```
node test.js | node index.js
```

### Running unit tests

```
npm test
```

## Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major>`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
