import React, { Component } from 'react';
import './App.css';
import "./nprogress.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from "./Alert";


class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;
    const isOffline = navigator.onLine ? false : true;
    this.setState({
      offlineInfo: isOffline
        ? "No internet connection is available. Data is loaded from cache."
        : " "
    });
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents)
          , locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      const isOffline = navigator.onLine ? false : true;
      this.setState({
        events: locationEvents,
        offlineInfo: isOffline
          ? "No internet connection is available. Data is loaded from cache."
          : " "
      });
    });
  }

  render() {
    let { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <h1>The Meet App</h1>
        <h3 className="subtitle">Search for a city to see its upcoming events:</h3>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} numberOfEvents={numberOfEvents} />
        <div className="warningAlert">
          <WarningAlert text={this.state.offlineInfo} />
        </div>
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
