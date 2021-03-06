const path = require('path');

const TextList = require('./util/TextList');

const TLDs = new TextList(path.join(__dirname, 'util/tlds.txt'));
const Protocols = new TextList(path.join(__dirname, 'util/protocols.txt'));

module.exports = string => {
  const urlRegex = /^(?:([a-z0-9-]*):\/\/)?(?:([a-z0-9-\.]*)\.)*([a-z0-9-]*)$/igm;
  const ipRegex = /^(?:[0-9]*\.){3}[0-9]{1,}$/g;

  string = string.trim();

  let isValid = false;
  string.replace(urlRegex, (match, protocol, domain, tld) => {
    const hasProtocol = !!protocol;
    const isValidProtocol = hasProtocol ? Protocols.check(protocol) : false;
    const hasTLD = !!tld;
    const isValidTLD = hasTLD ? TLDs.check(tld) : false;
    const hasDomain = !!domain;

    if (hasProtocol && !isValidProtocol) {
      isValid = false;
    }
    else if (hasProtocol && isValidProtocol) {
      isValid = true;
    }
    else if (!hasDomain) {
      isValid = false;
    }
    else if (hasTLD && !isValidTLD) {
      isValid = false;
    }
    else if (hasTLD && isValidTLD) {
      isValid = true;
    }

    return match;
  });

  string.replace(ipRegex, match => {
    isValid = true;

    return match;
  });

  if (Protocols.check(string.split('://')[0]) && string.indexOf(' ') === -1) isValid = true;

  return isValid;
};
