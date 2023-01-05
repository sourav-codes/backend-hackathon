const { spfVerify } = require('../helpers/spf-verify')
const { isNameExistWithEmail } = require('../helpers/common');

const isEmailSpoof = async ({ email, name, domain }) => {
    if (isNameExistWithEmail(email, name)) {
        return false;
    }

    const spfRecords = spfVerify(domain);

    if (!spfRecords.length) {
        return false;
    }
};

module.exports.isEmailSpoof = isEmailSpoof;