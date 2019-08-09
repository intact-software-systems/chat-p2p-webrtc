import {request} from 'stun'

export default function () {
    return new Promise((resolve, reject) => {
        request('localhost:19302', (err, res) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            else {
                const {address} = res.getXorAddress()
                console.log('your ip', address)
                resolve(address)
            }
        })
    })
}

