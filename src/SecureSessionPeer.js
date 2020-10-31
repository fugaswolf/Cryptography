const nacl = require('libsodium-wrappers')

module.exports = async () => {

    // crypto_secretbox_open_easy

    return Object.freeze({
        publicKey: 'SomeKey',
        encrypt: (msg) => {
            // returns object with cipherText & nonce

            const nonce = 'testnoncecxxxddd';



            // crypto_secretbox_easy
            const idk = nacl.crypto_secretbox_easy(msg, nonce, this.publicKey)


            console.log(JSON.stringify(idk))

            process.exit()

            return {
                nonce: nonce,
                cipherText: ''
            }
        },
        send: (peerMsg) => {

        },
        receive: () => {

        }
    });
}