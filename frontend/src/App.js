import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    return (
      <div>
        <Main/>
      </div>
    );
  }
}

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profiles: [],
    };
  }

  async componentDidMount(){
    try{
      const res = await fetch('http://127.0.0.1:8000/api/profiles/');
      const profiles = await res.json();
      this.setState({
        profiles
      });
    } catch(e){
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.profiles.map(item => (
          <div key = {item.id}>
            <span>{item.id}</span>
            <span>{item.user}</span>
            <span>{item.university}</span>
          </div>
        ))}
        <br/>
      </div>
    );
  }
}

export default App;
