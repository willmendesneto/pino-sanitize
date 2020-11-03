'use strict';

const pino = require('pino')();

const uuid = 'fe35c68e-1648-40a5-8f3a-a7d5ae054261';
const hash = '2cccdfbad40b872c6615c9721d14b904465a424e';

pino.info('hello world');
pino.error('this is at error level');
pino.info('the answer is %d', 42);
pino.info({ obj: 42 }, 'hello world');
pino.info({ obj: 42, b: 2 }, 'hello world');
pino.info({ nested: { obj: 42 } }, 'nested');
setImmediate(function () {
  pino.info('after setImmediate');
});
pino.error(new Error(`an error with UUID: ${uuid}`));

var child = pino.child({ a: `property ${uuid}` });
child.info('hello child!');

var childsChild = child.child({ another: 'property' });
childsChild.info('hello baby..');

pino.debug('this should be mute');

pino.level = 'trace';

pino.debug('this is a debug statement');

pino.child({ another: '#property2' }).debug('this is a debug statement via child');
pino.trace('this is a trace statement');

pino.debug('this is a "debug" statement with "');

pino.info('hello world');

pino.info(`API CALLED: www.test.com/${uuid}/user/7627:${hash}?test=true with HTTP Status 200`);
