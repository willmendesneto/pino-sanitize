#! /usr/bin/env node

'use strict';

const split = require('split2');
const pump = require('pump');
const args = require('args');
const through = require('through2');
const { sanitizeQueryString, sanitizeHash, sanitizeUUID } = require('./lib/utils');

args
  .option(['u', 'uuid'], 'Filter log removing UUID (defaults to `false`)')
  .option(['h', 'hash'], 'Filter log removing UUID (defaults to `false`)')
  .option(['q', 'qs'], 'Filter log removing Query String (defaults to `false`)')
  .option(
    ['k', 'keys'],
    'Define which keys should be sanitized (`-k err,msg`) (defaults to `err,error,msg,message`)',
    'err,msg',
  );

const sanitize = (log, opts) => {
  let sanitizedLog = '';
  if (opts.qs) {
    sanitizedLog = sanitizeQueryString(log);
  }
  if (opts.uuid) {
    sanitizedLog = sanitizeUUID(sanitizedLog, opts.uuid);
  }
  if (opts.hash) {
    sanitizedLog = sanitizeHash(sanitizedLog, opts.hash);
  }

  return sanitizedLog;
};

const logLevelTransformer = through.obj((chunk, enc, cb) => {
  const opts = Object.assign(
    {},
    {
      qs: false,
      q: false,
      h: false,
      hash: false,
      u: false,
      uuid: false,
      k: 'err,msg',
      keys: 'err,msg,stack',
    },
    args.parse(process.argv),
  );

  if (typeof chunk === 'string' || typeof chunk !== 'object') {
    console.log(sanitize(chunk, opts));
    cb();
    return;
  }

  const keys = opts.keys.split(',');
  for (const key of keys) {
    if (chunk.hasOwnProperty(key)) {
      chunk[key] = sanitize(chunk[key], opts);
    }
  }

  console.log(JSON.stringify(chunk));
  cb();
});

function tryParseJSON(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    if (e.name === 'SyntaxError') {
      return s;
    }
    throw e;
  }
}

pump(process.stdin, split(tryParseJSON), logLevelTransformer);
