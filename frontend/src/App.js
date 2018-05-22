import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import{
  BroswerRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    return (
      <div style = {styles.general}>
        <Link to={"/main"}>Home</Link>
        <br/>
        <Route path="/main" component={Main}/>
        <Route path='/profiles/:userId' component={Profile}/>
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
        <h1>Test React Stock App</h1>
        {this.state.profiles.map(profile => (
          <div key = {profile.id}>
            <span><Link to={`/profiles/${profile.id}`}>id: {profile.id}</Link></span><span>    |     </span>
            <span>{profile.user}</span>
          </div>
        ))}
        <br/>
      </div>
    );
  }
}

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: '',
      bio: '',
      location: '',
      age: null,
      university: '',
      stocks: [],
    }
  }
  componentDidMount(){
    const { match : { params } } = this.props;
    const emptyStocks = false;
    axios.get(`http://127.0.0.1:8000/api/profiles/${params.userId}`)
    .then(({ data: profile }) => {
      this.setState({
        user: profile.user,
        bio: profile.bio,
        location: profile.location,
        age: profile.age,
        university: profile.university,
      });
    })
    .catch(function(err){
      console.log("Error! " + err);
    });
    axios.get(`http://127.0.0.1:8000/api/profiles/${params.userId}/stocks/`)
    .then((response) => {
      this.setState({stocks: response.data})
    })
    .catch(function(err){
      console.log("Error!: " + err);
    });
  }
  render(){
    return(
      <div>
        <h1>Profile Detail Page for {this.state.user}</h1>
        <h4>User: {this.state.user}</h4>
        <h5>Bio: {this.state.bio}</h5>
        <h5>Location: {this.state.location}</h5>
        <h5>Age: {this.state.age}</h5>
        <h5>University: {this.state.university}</h5>
        <br/>
        <h3> Owned Stocks for {this.state.user}</h3>
        {this.state.stocks.map(stock => (
          <div key = {stock.id}>
            <span>{stock.name}: {stock.count} shares.</span>
          </div>
        ))}
      </div>
    );
  }
}

const styles = {};

styles.general = {
  padding: "20px"
}

export default App;
