const nacl = require('libsodium-wrappers')
const Decryptor = require('./Decryptor.js');
const Encryptor = require('./Encryptor.js');

let result = {}

module.exports = async (peer) => {
    await nacl.ready;
    
    let encryptor;
    let decryptor;

    let keys = nacl.crypto_kx_keypair();

    if(peer){  
        await peer.setClientSession(keys.publicKey);
        let serverSessionKeys = nacl.crypto_kx_server_session_keys(keys.publicKey, keys.privateKey, peer.publicKey);
  
        encryptor = await Encryptor(serverSessionKeys.sharedTx);
        decryptor = await Decryptor(serverSessionKeys.sharedRx);

    }
    return Object.freeze({
        publicKey : keys.publicKey,
        encrypt : (message) => {
            return encryptor.encrypt(message);
        },

        decrypt : (ciphertext, nonce) => {
            return decryptor.decrypt(ciphertext, nonce);
        },

        send : (message) => {
            result = encryptor.encrypt(message);
        },

        receive : () => {
            let message;
            if(result){
                message = decryptor.decrypt(result.ciphertext, result.nonce);
                result = {};
            }
            return message;
        },

        setClientSession : async (serverPublicKey) => {
            let clientSessionKeys =  nacl.crypto_kx_client_session_keys(keys.publicKey, keys.privateKey, serverPublicKey);
            encryptor = await Encryptor(clientSessionKeys.sharedTx);
            decryptor = await Decryptor(clientSessionKeys.sharedRx);
        }
    });
}


/*
const nacl = require('libsodium-wrappers');

module.exports = async () => {

    await nacl.ready;
    await nacl.ready;
    const keypair = nacl.crypto_box_keypair();
    publicKey = keypair.publicKey;
    privateKey = keypair.privateKey;


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
}*/