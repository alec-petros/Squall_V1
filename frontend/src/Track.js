import React from 'react';
import AudioPlayer from 'react-cl-audio-player'

import Filestack from 'filestack-js'
const api_key = "AHe7lVMVWSVycM21THpXwz"
const client = Filestack.init('api_key');
const api_policy = {"expiry":1530331200,"call":["pick","read","stat","write","remove"]}

class Track extends React.Component {

  handleDelete = () => {
    client.remove(this.props.data.handle, {
      policy: api_policy
    })
    this.props.delete(this.props.data.id)
  }

  componentDidMount() {
    let source = this.props.audioCtx.createMediaElementSource(document.getElementById(this.props.data.id))
    source.connect(this.props.analyser)
  }

  render() {
    const song = {
      url: this.props.data.url,
      artist: {
        name: this.props.data.name,
        artist: this.props.data.artist
      }
    }
    return (
      <div className="tracks">
        <h3>{this.props.data.name}</h3>
        <h5>By {this.props.data.artist}</h5>
        <button onClick={this.handleDelete}>Delete</button><br></br>
        <audio className="audio-track" crossOrigin="anonymous" id={this.props.data.id} controls="controls" src={this.props.data.url}></audio>
      </div>
    )
  }
}

export default Track
