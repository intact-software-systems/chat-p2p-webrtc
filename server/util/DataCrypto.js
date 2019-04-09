const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const encoding = 'hex'

var key = undefined
const dataValidityPeriodMilliseconds = 24 * 60 * 60 * 1000

class DataCrypto {
    // static getKey() {
    //     if (!key) {
    //         key = require('./ConfigRepository').config.cryptoKey
    //     }
    //     return key
    // }
    //
    // static getConfiguredCryptoKey() {
    //     return require('./ConfigRepository').config.cryptoKey
    // }

    static initializeKey(cryptoKey) {
        key = !cryptoKey ? DataCrypto.getConfiguredCryptoKey() : cryptoKey
    }

    static encrypt(json) {
        let data = {
            expiryTime: new Date().getTime() + dataValidityPeriodMilliseconds,
            data: json,
        }

        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(DataCrypto.getKey()), iv)

        let encrypted = cipher.update(JSON.stringify(data))
        encrypted = Buffer.concat([encrypted, cipher.final()])

        return {
            checksum: iv.toString(encoding),
            encryptedData: encrypted.toString(encoding)
        }
    }

    static decrypt(cryptoData) {
        if (!cryptoData.checksum || !cryptoData.encryptedData) {
            throw new Error("Invalid crypto data: " + JSON.stringify(cryptoData))
        }

        const iv = Buffer.from(cryptoData.checksum, encoding)
        const encryptedText = Buffer.from(cryptoData.encryptedData, encoding)
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(DataCrypto.getKey()), iv)

        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return JSON.parse(decrypted.toString())
    }

    static isExpired(decryptedData) {
        if (!decryptedData.expiryTime) {
            return true
        }

        return decryptedData.expiryTime < new Date().getTime()
    }

    static decryptWithValidation(cryptoData) {
        const decryptedCryptoData = DataCrypto.decrypt(cryptoData)
        if (!DataCrypto.isExpired(decryptedCryptoData)) {
            return decryptedCryptoData.data
        }
        else {
            throw new Error("Expired attached data: " + JSON.stringify(decryptedCryptoData.data))
        }
    }
}

module.exports = {
    encrypt: DataCrypto.encrypt,
    decrypt: DataCrypto.decrypt,
    isExpired: DataCrypto.isExpired,
    decryptWithValidation: DataCrypto.decryptWithValidation,
    initializeKey: DataCrypto.initializeKey
}
