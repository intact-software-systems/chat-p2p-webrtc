const stun = require('stun')

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

