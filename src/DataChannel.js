class Callbacks {
    onopen = []
    onclose = []
    onmessage = []
    ondatachannel = []

    onOpenDo(onopen) {
        this.onopen.push(onopen)
        return this
    }

    onCloseDo(onclose) {
        this.onclose.push(onclose)
        return this
    }

    onMessageDo(onmessage) {
        this.onmessage.push(onmessage)
        return this
    }

    onOpen() {
        this.onopen.forEach(callback => callback())
    }

    onClose() {
        this.onclose.forEach(callback => callback())
    }

    onMessage(event) {
        this.onmessage.forEach(callback => callback(event))
    }
}

export default class DataChannel {
    name
    connected
    localConnection
    remoteConnection
    sendChannel
    receiveChannel

    constructor(name) {
        this.name = name
        this.connected = false
        this.subject = new Callbacks()


        this.localConnection = new RTCPeerConnection()
        this.sendChannel = this.localConnection.createDataChannel(this.name)
        this.sendChannel.binaryType = 'arraybuffer'

        this.sendChannel.addEventListener('open', event => {
            this.connected = true
            this.subject.onOpen()
        })

        this.sendChannel.addEventListener('close', event => {
            this.connected = false
            this.subject.onClose()
        })

        this.sendChannel.addEventListener('message', event => {
            console.log('Received ' + event.data)
            this.subject.onMessage(event)
        })


        this.remoteConnection = new RTCPeerConnection()
        this.remoteConnection.addEventListener('datachannel', event => {

            console.log('onRemoteDataChannel:' + JSON.stringify(event))

            this.receiveChannel = event.channel
            this.receiveChannel.binaryType = 'arraybuffer'
            this.receiveChannel.addEventListener('message', event => console.log('Received data' + event.data))
            this.receiveChannel.addEventListener('close', () => {
                console.log('Remote channel closed!')
                this.connected = false
            })
        })


        this.localConnection.onicecandidate = e => {
            console.log('Local connection ice candidate ')
            return !e.candidate
                || this.remoteConnection.addIceCandidate(e.candidate)
                    .catch(e => console.error(e))
        }


        this.remoteConnection.onicecandidate = e => {
            console.log('Remote connection ice candidate ')
            return !e.candidate
                || this.localConnection.addIceCandidate(e.candidate).catch(e => console.error(e))
        }

    }

    static withName(name) {
        return new DataChannel(name)
    }

    isConnected() {
        return this.connected
    }

    callbacks() {
        return this.subject
    }

    sendMessage(message) {
        this.sendChannel.send(message)
        return this
    }

    // onRemoteDataChannel(ondatachannel) {
    //     this.remoteConnection.addEventListener('datachannel', event => {
    //
    //         console.log(`onRemoteDataChannel: ${JSON.stringify(event)}`);
    //         this.receiveChannel = event.channel;
    //         this.receiveChannel.binaryType = 'arraybuffer';
    //         this.receiveChannel.addEventListener('message', event => console.log("Received data" + event.data));
    //         this.receiveChannel.addEventListener('close', () => {
    //             console.log('Remote channel closed!');
    //             this.connected = false;
    //         });
    //
    //         ondatachannel(event)
    //     })
    // }

    onLocalIceCandidate(onicecandidate) {
        this.localConnection.onicecandidate = e => {
            return !e.candidate
                || this.remoteConnection.addIceCandidate(e.candidate)
                    .catch(e => console.error(e))
        }

        return this
    }

    onRemoteIceCandidate(onicecandidate) {
        this.remoteConnection.onicecandidate = e => {
            return !e.candidate
                || this.localConnection.addIceCandidate(e.candidate).catch(e => console.error(e))
        }

        return this
    }


    connect() {
        this.localConnection.createOffer()
            .then(offer => {
                console.log('Got local offer ' + JSON.stringify(offer))
                return this.localConnection.setLocalDescription(offer)
            })
            .then(() => this.remoteConnection.setRemoteDescription(this.localConnection.localDescription))
            .then(() => this.remoteConnection.createAnswer())
            .then(answer => {
                console.log(`Got remote answer ${JSON.stringify(answer)}`)
                return this.remoteConnection.setLocalDescription(answer)
            })
            .then(() => this.localConnection.setRemoteDescription(this.remoteConnection.localDescription))
            .catch(e => {
                console.error('Create offer failure', e)
            })

        return this
    }
}
