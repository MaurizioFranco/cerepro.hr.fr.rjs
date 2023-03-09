import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this.props.duration,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
        if(this.state.timeLeft >0){
            this.setState({ timeLeft: this.state.timeLeft - 1 });
        }
        else{
            this.props.sendSurveyProp();
        }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const minutes = Math.floor(this.state.timeLeft / 60);
    const seconds = this.state.timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
      <h3>Time remaining: {formattedTime}</h3>
    );
  }
}

export default Timer;