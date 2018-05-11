import React from 'react';
import ReactFilestack from 'filestack-react';
import Filestack from 'filestack-js'

const tracks_url = "http://localhost:3000/tracks"
const api_policy = {"expiry":1530331200,"call":["pick","read","stat","write","remove"]}
const client = Filestack.init('api_key');
const options = {policy: api_policy}

class Uploader extends React.Component {

  state = {
    name: "",
    artist: ""
  }

  handleChange = (e) => {
    e.target.name === "name" ? this.setState({name: e.target.value}) : this.setState({artist: e.target.value})
  }

  postUpload = (resp) => {
    fetch(tracks_url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        track: {
          name: this.state.name,
          artist: this.state.artist,
          handle: resp.filesUploaded[0].handle,
          url: resp.filesUploaded[0].url
        }
      })
    }).then(r => r.json()).then(json => this.props.addTrack(json))
  }

  render() {
    return(
      <div>
        <form onChange={this.handleChange}>
          <input type="text" placeholder="Name" name="name" value={this.state.name} /><br></br>
          <input type="text" placeholder="Artist" name="artist" value={this.state.artist} />
        </form>
        <ReactFilestack
          apikey={process.env.REACT_APP_FILESTACK_API_KEY}
          buttonText="Upload Song"
          buttonClass="classname"
          onSuccess={this.postUpload}
        />
      </div>
    )
  }
}

export default Uploader
