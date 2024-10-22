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
        if (this.peer) {
            let offer = await this.peer.createOffer()
            
            await this.peer.setLocalDescription(new RTCSessionDescription(offer))
            
            return offer
        }
    }

    async getAnwser (offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            
            const answer = await this.peer.createAnswer();
            
            await this.peer.setLocalDescription(new RTCSessionDescription(answer));
            
            return answer;
        }
    }

    async setRemoteLocation (answer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
        }
    }
}

export default new Peer()