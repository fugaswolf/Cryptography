const nacl = require('libsodium-wrappers');

module.exports = async () => {

    const nacl = require('libsodium-wrappers');
    await nacl.ready;

    var obj = nacl.crypto_sign_keypair();
    pubKey = obj.publicKey;
    privKey = obj.privateKey;

    return Object.freeze({
        verifyingKey: pubKey,
        sign: (msg) => {
            return nacl.crypto_sign(msg, privKey);
        }
    });
}