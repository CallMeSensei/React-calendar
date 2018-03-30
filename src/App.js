import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock.js';
import Calendar from './Calendar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Clock ></Clock>
        <Calendar dates={DATES} max={3}></Calendar>
      </div>
    );
  }

}

const DATES = [
  [
    {title: { day: 'Mardi 20', month: 'février 2018'}},
    {start_on: '2018-02-20 08:00:00'},
    {start_on: '2018-02-20 15:00:00'},
    {start_on: '2018-02-20 16:00:00'}
  ],
  [
    {title: { day: 'Mercredi 21', month: 'février 2018'}}
  ],
  [
    {title: { day: 'Jeudi 22', month: 'février 2018'}},
    {start_on: '2018-02-22 10:00:00'},
    {start_on: '2018-02-22 12:00:00'}
  ],
  [
    {title: { day: 'Vendredi 23', month: 'février 2018'}},
    {start_on: '2018-02-23 11:00:00'}
  ]
]

export default App;
