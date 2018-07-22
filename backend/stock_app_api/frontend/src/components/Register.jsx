import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Login extends Component {

  state = {
    username: "",
    password: "",
    bio: "",
    location: "",
    age: null,
    university: "",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.username, this.state.password, this.state.bio, this.state.location, this.state.age, this.state.university);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <label htmlFor="bio" id="bio">Bio</label>
            <input type="text" id="bio" onChange={e => this.setState({bio: e.target.value})}/>
          </p>
          <p>
            <label htmlFor="location" id="location">Location</label>
            <input type="text" id="location" onChange={e => this.setState({location: e.target.value})}/>
          </p>
          <p>
            <label htmlFor="age" id="age">Age</label>
            <input type="text" id="age" onChange={e => this.setState({age: e.target.value})}/>
          </p>
          <p>
            <label htmlFor="university" id="university">University</label>
            <input type="text" id="university" onChange={e => this.setState({university: e.target.value})}/>
          </p>
          <p>
            <button type="submit">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password, bio, location, age, university) => {
      dispatch(auth.register(username, password, bio, location, age, university));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
