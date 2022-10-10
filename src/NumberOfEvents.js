import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  handleInputChanged = (event) => {
    let actValue = event.target.value; //parseInt(event.target.value)
    //console.log('events:' + actValue);
    if (actValue > 0 && actValue <= 32) {
      this.setState({
        numberOfEvents: actValue,
        errorText: ''
      });
    } else if (actValue > 32 || actValue < 1) {
      this.setState({
        numberOfEvents: 32,
        errorText: 'Please choose a number between 1 and 32.'
      });
    } else {
      this.setState({
        numberOfEvents: undefined,
        errorText: ' '
      });
      actValue = 1;
    }
    //this.props.updateEvents(undefined, actValue);
  };

  render() {
    const { numberOfEvents } = this.state;
    //console.log('events:' + numberOfEvents);
    return (
      <div>
        <div className="numberOfEvents">
          <label htmlFor="events-number">Number of events: </label>
          <br />
          <input
            type="number"
            className="number-of-events"
            value={this.state.numberOfEvents}
            onChange={this.handleInputChanged}
          />
        </div>
        <div className="errorAlert">
          <ErrorAlert text={this.state.errorText} />
        </div>
      </div>
    );
  }

}

export default NumberOfEvents;