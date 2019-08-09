require('log-timestamp')

const stun = require('stun')


async function stunRequest() {
    try {
        const res = await stun.request('stun.l.google.com:19302')
        const {address} = res.getXorAddress()
        console.log('your ip', address)
        return res
    } catch (err) {
        console.log(err)
        return err
    }
}

function stunRequest2() {
    return new Promise(((resolve, reject) => {
        stun.request('stun.l.google.com:19302', (err, res) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            else {
                const {address} = res.getXorAddress()
                console.log('your ip', address)
                resolve(res)
            }
        })
    }))
}


stunRequest2()
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })


