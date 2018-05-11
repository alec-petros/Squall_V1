import React, { Component } from 'react';
import SongList from './SongList'
import Backdrop from './Backdrop'
import './App.css';

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
analyser.connect(audioCtx.destination)
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

class App extends Component {

  render() {
    return (
      <div className="App">
        <button onClick={() => {audioCtx.resume()}}>Resume</button>
        <SongList audioCtx={audioCtx} analyser={analyser} />
        <Backdrop bufferLength={bufferLength} dataArray={dataArray} audioCtx={audioCtx} analyser={analyser} />
      </div>
    );
  }
}

export default App;
