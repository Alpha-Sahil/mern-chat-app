// const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

// const peerConnection = new RTCPeerConnection(configuration)

// const offer = async () => {
//     let offer = await peerConnection.createOffer()

//     await peerConnection.setLocalDescription(new RTCSessionDescription(offer))

//     return offer
// }

// const answer = async () => {

// }

// export default peerConnection

class Peer {
    constructor () {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                        ],
                    },
                ],
            });
        }
    }

    async getOffer () {
        if (this.peer) {}
            let offer = await this.peer.createOffer()
            
            await this.peer.setLocalDescription(new RTCSessionDescription(offer))
            
            return offer
    }
}

export default new Peer()