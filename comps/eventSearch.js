import React from "react";
import _ from "lodash";
import { Search, Dimmer, Loader, Segment, Button } from "semantic-ui-react";
import Link from "next/link";
var md5 = require("js-md5");

class EventSearch extends React.Component {
  state = {
    value: "",
    value_id: 0,
    events: [],
    isLoading: true,
    pageLoader: true,
    eventEmpty: true
  };

  formatEvents(eventArr) {
    return eventArr.map(event => ({ title: event.title, id: event.id }));
  }

  componentDidMount() {
    this.resetComponent();
    let storedEvents = sessionStorage.getItem("events");
    if (storedEvents) {
      this.setState({
        events: this.formatEvents(JSON.parse(storedEvents)),
        pageLoader: false
      });
    } else {
      this.marvelFetch();
    }
  }

  getHash = () => {
    var publickey = process.env.PUBLIC_KEY;
    var privatekey = process.env.PRIVATE_KEY;
    var day = new Date();
    const ts = day.getTime();
    var stringToHash = ts + privatekey + publickey;
    var hash = md5(stringToHash);
    return hash;
  };

  marvelFetch = () => {
    let hash = this.getHash();
    fetch(
      `https://gateway.marvel.com:443/v1/public/events?limit=20&apikey=${process.env.PUBLIC_KEY}&hash=${hash}`
    )
      .then(r => r.json())
      .then(r => this.setState({ events: this.formatEvents(r.data.results) }))
      .then(r => this.setState({ pageLoader: false }));
  };

  componentWillUnmount() {
    this.state.events.length > 1
      ? sessionStorage.setItem("events", JSON.stringify(this.state.events))
      : null;
  }

  resetComponent = () =>
    this.setState({
      isLoading: false,
      results: [],
      value: "",
      eventEmpty: true
    });

  handleSubmit = e => {
    e.preventDefault();
  };

  handleResultSelect = (e, { result }) =>
    this.setState({
      value: result.title,
      value_id: result.id,
      eventEmpty: false
    });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.events, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div>
        <Segment>
          <Dimmer inverted active={this.state.pageLoader}>
            <Loader>Loading</Loader>
          </Dimmer>
          <form onSubmit={event => this.handleSubmit(event)}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
              {...this.props}
            />
            <Link
              href={{
                pathname: "/quiz",
                query: { selected_event: this.state.value_id }
              }}
            >
              <Button primary disabled={this.state.eventEmpty}>
                Start Quiz!
              </Button>
            </Link>
          </form>
        </Segment>
      </div>
    );
  }
}

export default EventSearch;
