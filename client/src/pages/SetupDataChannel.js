import React from 'react'
import PropTypes from 'prop-types'
import DataChannelOneWay from '../webrtc/DataChannelOneWay'
import IF from '../util/IF'

import StunRequest from '../webrtc/StunRequest'

/**

 https://www.html5rocks.com/en/tutorials/webrtc/basics/

 https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/


 Imagine Alice is trying to call Eve. Here's the full offer/answer mechanism in all its gory detail:

 Alice creates an RTCPeerConnection object.
 Alice creates an offer (an SDP session description) with the RTCPeerConnection createOffer() method.
 Alice calls setLocalDescription() with his offer.
 Alice stringifies the offer and uses a signaling mechanism to send it to Eve.

 Eve calls setRemoteDescription() with Alice's offer, so that her RTCPeerConnection knows about Alice's setup.
 Eve calls createAnswer(), and the success callback for this is passed a local session description: Eve's answer.
 Eve sets her answer as the local description by calling setLocalDescription().
 Eve then uses the signaling mechanism to send her stringified answer back to Alice.
 Alice sets Eve's answer as the remote session description using setRemoteDescription().


 */
export default class SetupDataChannel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            address: undefined,
            channel: new DataChannelOneWay('default'),
            offer: undefined
        }
    }

    static propTypes = {
        onOffer: PropTypes.func.isRequired
    }

    render() {
        // Communicate with signalling server

        // Create the WebRTC offer and answers

        // Communicate with Stun server to fetch public IP

        // One button for each step


        return <div>

            <div className="alert alert-primary">
                Public IP: {this.state.address}
            </div>

            <br/>

            <IF condition={this.state.offer !== undefined}>
                <div className="alert alert-primary">
                    OFFER: {JSON.stringify(this.state.offer)}
                </div>
            </IF>


            <div className="btn-group" role="group" aria-label="stun">
                <button type="button" className="btn btn-primary" onClick={event => {
                    StunRequest()
                        .then(address => {
                            this.setState({
                                address: address
                            })
                        })
                }}
                        tabIndex={1}
                >
                    Fetch Public IP
                </button>

            </div>

            <div className="btn-group" role="group" aria-label="webrtc">

                <button type="button" className="btn btn-primary" onClick={event => {
                    this.state.channel.createOffer()
                        .then(offer => {
                            this.setState({
                                offer: offer
                            })
                        })
                }}
                        tabIndex={1}
                >
                    Create Offer
                </button>

            </div>
        </div>
    }
}

