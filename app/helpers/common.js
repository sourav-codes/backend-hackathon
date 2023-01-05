
const isNameExistWithEmail = (email, name) => {
    email = email.replace(/[^A-Z0-9]+/ig, "")
    name = name.replace(/[^A-Z0-9]+/ig, "");
    return email.includes(name)
}

module.exports.isNameExistWithEmail = isNameExistWithEmail;