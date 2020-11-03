'use strict';

const tap = require('tap');
const utils = require('../../lib/utils');

tap.test('sanitizeUUID', (t) => {
  const { sanitizeUUID } = utils;
  const uuid = 'fe35c68e-1648-40a5-8f3a-a7d5ae054261';
  t.test('returns string without query string', async (t) => {
    const str = sanitizeUUID(undefined);

    t.is(str, undefined);
  });

  t.test('returns string without query string if UUID', async (t) => {
    const msg = `API CALLED: /${uuid}/user/7627:${uuid} with HTTP Status 200`;
    const str = sanitizeUUID(msg);

    t.is(str, 'API CALLED: /:uuid/user/7627::uuid with HTTP Status 200');
  });

  t.end();
});

tap.test('sanitizeHash', (t) => {
  const { sanitizeHash } = utils;
  const hash = '2cccdfbad40b872c6615c9721d14b904465a424e';
  t.test('returns string without query string', async (t) => {
    const str = sanitizeHash(undefined);

    t.is(str, undefined);
  });

  t.test('returns string without query string if UUID', async (t) => {
    const msg = `API CALLED: /${hash}/user/7627:${hash} with HTTP Status 200`;
    const str = sanitizeHash(msg);

    t.is(str, 'API CALLED: /:hash/user/7627::hash with HTTP Status 200');
  });

  t.end();
});

tap.test('sanitizeQueryString', (t) => {
  const { sanitizeQueryString } = utils;

  t.test('returns string without query string if HTTP', async (t) => {
    const str = sanitizeQueryString(undefined);

    t.is(str, undefined);
  });

  t.test('returns string without query string if HTTP', async (t) => {
    const msg = 'Find more about it at http://www.example.com?huehue=true&hello=world website';
    const str = sanitizeQueryString(msg);

    t.is(str, 'Find more about it at http://www.example.com website');
  });

  t.test('returns string without query string if HTTPS', async (t) => {
    const msg = 'Find more about it at https://www.example.com?huehue=true&hello=world website';
    const str = sanitizeQueryString(msg);

    t.is(str, 'Find more about it at https://www.example.com website');
  });

  t.test('returns string without query string if www', async (t) => {
    const msg = 'Find more about it at www.example.com?huehue=true&hello=world website';
    const str = sanitizeQueryString(msg);

    t.is(str, 'Find more about it at www.example.com website');
  });

  t.end();
});
