export default class Callbacks {
    onopen = []
    onclose = []
    onmessage = []
    ondatachannel = []
    onicecandidate = []

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

    onIceCandidateDo(onicecandidate) {
        this.onicecandidate.push(onicecandidate)
        return this
    }

    onDataChannelDo(ondatachannel) {
        this.ondatachannel.push(ondatachannel)
        return this
    }

    onOpen(event) {
        this.onopen.forEach(callback => callback(event))
    }

    onClose(event) {
        this.onclose.forEach(callback => callback(event))
    }

    onMessage(event) {
        this.onmessage.forEach(callback => callback(event))
    }

    onIceCandidate(event) {
        this.onicecandidate.forEach(callback => callback(event))
    }

    onDataChannel(event) {
        this.ondatachannel.forEach(callback => callback(event))
    }
}
