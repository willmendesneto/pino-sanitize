'use strict';

function sanitizeQueryString(log, replaceTo) {
  if (!log) {
    return undefined;
  }

  const findCommonWebLinkReferencesFromString = /(((https?:\/\/)|(www\.)|(ftp\.)|(file\.))[^\s]+)/g;
  const removesQueryString = (url) =>
    url.toLowerCase().split('?')[0] + (replaceTo || '?:query-string');
  return log.replace(findCommonWebLinkReferencesFromString, removesQueryString);
}

function sanitizeUUID(log, replaceTo) {
  if (!log) {
    return undefined;
  }

  return log.replace(
    /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/gi,
    replaceTo || ':uuid',
  );
}

function sanitizeHash(log, replaceTo) {
  if (!log) {
    return undefined;
  }

  return log.replace(/[0-9a-fA-F]{40}/gi, replaceTo || ':hash');
}

module.exports = { sanitizeHash, sanitizeUUID, sanitizeQueryString };
