# pino-sanitize

This is a tranport for pino that sanitizes sensitive data, such as UUID, tokens, and hashes inside some log field.

## Usage

```sh
npm install pino-sanitize
```

And in your package.json

```json
{
    ...
    "scripts":{
        ...
        "start": "node yourprocess.js | pino-sanitize"
    },
    ...
}
```

Then:

```sh
npm run start
```
