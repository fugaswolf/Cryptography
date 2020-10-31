const nacl = require('libsodium-wrappers');

module.exports = async () => {

    await nacl.ready;
    await nacl.ready;
    const keypair = nacl.crypto_box_keypair();
    publicKey = keypair.publicKey;
    privateKey = keypair.privateKey;

    /*
    const sharedKeys = nacl.crypto_kx_server_session_keys(serverPublicKey, serverPrivateKey, clientPublicKey);
    rx = sharedKeys.sharedRx;
    tx = sharedKeys.sharedTx;
     */

    return Object.freeze({
        publicKey: publicKey,
        encrypt: (msg) => {
            let nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
            let ciphertext = nacl.crypto_box_easy(msg, nonce, publicKey, privateKey);
            return {
                nonce: nonce,
                ciphertext: ciphertext
            }
        },
        decrypt: (ciphertext, nonce) => {
            return nacl.crypto_box_open_easy(ciphertext, nonce, publicKey, privateKey);
        },
        send: (peerMsg) => {

        },
        receive: () => {

        }
    });
}

/*
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
*/