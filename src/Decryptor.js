const nacl = require('libsodium-wrappers')

module.exports = async (key) => {
    if (!key || key.length === 0) {
        throw "no key";
    }

    return Object.freeze({
        decrypt: (ciphertext, nonce) => {
            if (!ciphertext || !nonce) {
                throw "invalid args";
            }

            return nacl.crypto_secretbox_open_easy(ciphertext, nonce, key);
        }
    });
}
