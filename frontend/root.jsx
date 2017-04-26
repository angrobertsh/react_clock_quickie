import React from 'react';
import ReactDOM from 'react-dom';




class Root extends React.Component {

  constructor(props){
    let now = new Date();
    let AMPM = now.getHours/12;
    AMPM = AMPM > 1 ? "AM" : "PM"
    super(props);
    this.state = {
      minutes: now.getMinutes(),
      hours: now.getHours()%12,
      AMPM: AMPM,
      seconds: now.getSeconds()
    }
    this.padding = this.padding.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentWillMount(){
    window.setInterval(this.updateTime, 1000);
  }

  updateTime(){
    let seconds = this.state.seconds + 1;
    let minutes = this.state.minutes;
    let hours = this.state.hours;
    let AMPM = this.state.AMPM;
    if(seconds > 59){
      seconds = 0;
      minutes += 1;
    }
    if(minutes > 59){
      minutes = 0;
      hours += 1;
    }
    if(hours > 12){
      if(AMPM = "AM"){
        AMPM = "PM";
      } else {
        AMPM = "AM";
      }
    }
    this.setState({minutes: minutes, hours: hours, AMPM: AMPM, seconds: seconds})
  }


  padding(str){
    if(str.length < 2){
      str = "0" + str;
    }
    return str
  }

  render() {
    let minstr = this.padding(this.state.minutes.toString());
    minstr = minstr + ":";
    let hourstr = this.padding(this.state.hours.toString());
    hourstr = hourstr + ":";
    let secondstr = this.padding(this.state.seconds.toString());
    let combinedstr = hourstr + minstr + secondstr + this.state.AMPM

    return(
      <div>
        <div id="center">
          <div className="clock-container">
            { combinedstr }
          </div>
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
