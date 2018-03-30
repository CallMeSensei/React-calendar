import React, { Component } from 'react';
import moment from 'moment';

class Slot extends Component {
  render() {
    if (this.props.date == null)
      return (<div className="slot empty"><div className="empty-slot"></div></div>);
    return (<div className="slot"><strong>{moment(this.props.date).format('LT')}</strong></div>);
  }
}

class Availabilities extends Component {
  render() {
    const slots = [];
    let date;
    let title;
    let key = 0;

    this.props.dates.forEach((d) => {
      if (d.hasOwnProperty('title')) {
        title = d.title
      } else {
        date = new Date(d.start_on);
        if (date !== undefined && slots.length < this.props.limit) slots.push(<Slot date={date} key={key}/>);
        key++;
      }
    });
    for (; slots.length < this.props.limit; key++)
      slots.push(<Slot date={null}  key={key} />);

    return (
      <div className="availabilities">
        <div className="title">
          <p className="main">{title.day}</p>
          {title.month}
        </div>
        {slots}
      </div>);
  }
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: this.props.dates,
      limit: 5,
      downClass: "down",
      firstDay: this.props.firstDay,
      lastDay: this.props.lastDay,
      max: this.props.max
    };
  }

  componentDidMount() {
    this.updateDownClass();
  }

  updateDownClass = () => {
    this.setState({
      downClass: "down"
    });
    if (this.state.limit >= this.state.max) {
      this.setState({
        downClass: "down hidden"
      });
    }
  }

  upLimit = () => {
    this.setState({
      limit: this.state.max
    });
    this.setState({
      downClass: "down hidden"
    });
  }

  updateState = (element) => {
    const availabilitiesContainer = element.getElementById('availabilities');
    const calendar = JSON.parse(availabilitiesContainer.dataset.availabilities);
    let max = 0;
    calendar.availabilities.forEach((c) => {
      if (c.length > max) max = c.length;
    });
    this.setState({
      dates: calendar.availabilities,
      firstDay: calendar.firstDay,
      lastDay: calendar.lastDay,
      limit: 5,
      max: max
    });
  }

/*
  getPrevAvailability = () => {
    Rails.ajax({
      type: 'GET',
      data: 'start=' + this.state.firstDay,
      url: '/widgetcalendar',
      success: (element) => {
        this.updateState(element);
        this.updateDownClass();
      }
    });
  }

  getNextAvailability = () => {
    Rails.ajax({
      type: 'GET',
      data: 'start=' + this.state.lastDay,
      url: '/widgetcalendar',
      success: (element) => {
        this.updateState(element);
        this.updateDownClass();
      }
    });
  }
*/

  render() {
    return (
      <div id="widget-calendar">
        <a className="arrow-left" onClick={this.getPrevAvailability}>
          <svg width="20" height="26" viewBox="0 0 10 16">
            <path d="M6.7.5c.2-.3.5-.5 1-.5s.8.2 1.2.5c.5.6.5 1.4 0 2.2L3.5 8 9 13.5c.6.8.6 1.5 0 2.2-.4.3-.8.4-1.3.4-.4 0-.8 0-1-.3L.4 9C0 9 0 8.6 0 8c0-.4 0-.8.4-1L6.7.5z"></path>
          </svg>
        </a>
        {this.state.dates.map((d, k) => {
          return <Availabilities dates={d} limit={this.state.limit} key={k}/>
        })}
        <a className="arrow-right" onClick={this.getNextAvailability}>
          <svg width="20" height="26" viewBox="0 0 10 16">
            <path d="M2.7.5c-.2-.3-.5-.5-1-.5S1 .2.5.5C-.2 1-.2 2 .5 2.7L5.7 8 .5 13.5c-.7.8-.7 1.5 0 2.2.3.3.7.4 1.2.4.4 0 .8 0 1-.3L9 9c.3-.2.4-.5.4-1 0-.4 0-.8-.4-1L2.7.5z"></path>
          </svg>
        </a>

        <div className={this.state.downClass}>
          <a onClick={this.upLimit}>
            Voir plus d'horaires
          </a>
        </div>
      </div>
    );
  }
}

export default Calendar;
