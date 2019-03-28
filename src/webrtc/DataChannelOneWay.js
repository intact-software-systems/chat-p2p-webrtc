import Callbacks from './Callbacks'

export default class DataChannelOneWay {
    name
    connected
    localConnection
    dataChannel
    subject

    onopen = event => {
        console.log('Send channel opened!')

        this.connected = true
        this.subject.onOpen()
    }

    onclose = event => {
        console.log('Send channel closed!')

        this.connected = false
        this.subject.onClose()
    }

    onmessage = event => {
        console.log('Send channel received ' + event.data)
        this.subject.onMessage(event)
    }

    onicecandidate = event => {
        console.log('Local connection ice candidate ' + event.candidate)
        // const promise = !event.candidate
        //     || this.remoteConnection.addIceCandidate(event.candidate)
        //         .catch(e => console.error(e))

        this.subject.onIceCandidate(event)
        // return promise
    }

    ondatachannel = event => {
        console.log('onDataChannel: ' + JSON.stringify(event))

        this.dataChannel = event.channel
        this.dataChannel.binaryType = 'arraybuffer'

        this.dataChannel.addEventListener('open', this.onopen)
        this.dataChannel.addEventListener('close', this.onclose)
        this.dataChannel.addEventListener('message', this.onmessage)
    }

    constructor(name) {
        this.name = name
        this.connected = false
        this.subject = new Callbacks()

        this.localConnection = new RTCPeerConnection()
        this.localConnection.onicecandidate = this.onicecandidate
        this.localConnection.addEventListener('datachannel', this.ondatachannel)

        this.dataChannel = this.localConnection.createDataChannel(this.name)
        this.dataChannel.binaryType = 'arraybuffer'

        this.dataChannel.addEventListener('open', this.onopen)
        this.dataChannel.addEventListener('close', this.onclose)
        this.dataChannel.addEventListener('message', this.onmessage)
    }

    static withName(name) {
        return new DataChannelOneWay(name)
    }

    isConnected() {
        return this.connected
    }

    callbacks() {
        return this.subject
    }

    channel() {
        return this.dataChannel
    }

    connection() {
        return this.localConnection
    }

    createOffer() {
        this.localConnection.createOffer()
            .then(offer => {
                console.log('Got local offer ' + JSON.stringify(offer))
                return this.localConnection.setLocalDescription(offer)
            })
            // .then(() => this.remoteConnection.setRemoteDescription(this.localConnection.localDescription))
            // .then(() => this.remoteConnection.createAnswer())
            // .then(answer => {
            //     console.log(`Got remote answer ${JSON.stringify(answer)}`)
            //     return this.remoteConnection.setLocalDescription(answer)
            // })
            // .then(() => this.localConnection.setRemoteDescription(this.remoteConnection.localDescription))
            .catch(e => {
                console.error('Create offer failure', e)
            })

        return this
    }

}
