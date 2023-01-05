'use strict';

const punycode = require('punycode/');
const dns = require('dns').promises;

const spfVerify = async (domain, opts) => {
    try {
        domain = punycode.toASCII(domain);
        console.log('domain ', domain);
    } catch (err) {

    }
    let resolver = opts.resolver || dns.resolve;

    let responses;
    try {
        responses = await resolver(domain, 'TXT');
        console.log('responses ', responses);
    } catch (err) {
        console.log('eerror ****', err);
        if (err.code !== 'ENOTFOUND' && err.code !== 'ENODATA') {
            throw err;
        }
        responses = [];
    }
    return responses;
};

module.exports = { spfVerify };
