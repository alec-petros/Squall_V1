import React from 'react';
import Track from './Track'
import Uploader from './Uploader'

const tracks_url = "http://localhost:3000/tracks"

class SongList extends React.Component {
  state = {
    songs: []
  }

  componentWillMount() {
    this.getSongs()
  }

  removeTrack = (id) => {
    fetch(tracks_url + `/${id}`, {
      method: "DELETE"
    }).then(r => this.getSongs())
  }

  addTrack = (song) => {
    this.setState({
      songs: [song, ...this.state.songs]
    })
  }

  getSongs() {
    fetch(tracks_url).then(r => r.json()).then(json => this.setState({songs: json}))
  }

  render() {
    return (
      <div>
        <Uploader addTrack={this.addTrack} />
        {this.state.songs.map(track => <Track analyser={this.props.analyser} audioCtx={this.props.audioCtx} delete={this.removeTrack} data={track} />)}
      </div>
    )
  }
}

export default SongList
