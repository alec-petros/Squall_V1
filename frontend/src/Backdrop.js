import React from 'react';

var canvas = document.getElementById("backdrop");
var canvasCtx = canvas.getContext("2d");

canvasCtx.canvas.width  = window.innerWidth;
canvasCtx.canvas.height = window.innerHeight;


class Backdrop extends React.Component {

  draw = () => {
    requestAnimationFrame(this.draw);

    this.props.analyser.getByteTimeDomainData(this.props.dataArray);

    canvasCtx.fillStyle = "rgb(240, 240, 240)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(150, 150, 150)";

    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / this.props.bufferLength;
    var x = 0;

    for (var i = 0; i < this.props.bufferLength; i++) {

      var v = this.props.dataArray[i] / 128.0;
      var y = v * canvas.height / 1.3;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }

  componentDidMount() {
    this.draw()
  }

  render() {
    return (<div>
    </div>)
  }
}

export default Backdrop
