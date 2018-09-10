import React, {Component} from "react";
import {connect} from "react-redux";

import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from "react-router-dom";

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

import {auth} from "../actions";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Login extends Component {

  state = {
    username: "",
    password: "",
    bio: "",
    location: "",
    age: null,
    university: "",
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    city: "",
    state: "",
    postalCode: "",
    dateOfBirth: "",
    ssn: "",
  }

  componentDidMount(){
    document.body.style.backgroundColor='white';
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.username, this.state.password, this.state.bio, this.state.location, this.state.age, this.state.university);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    const { classes } = this.props;
    return (
      <div>
        <div style={{height:'5em'}}></div>
        <img src={require('../assets/Reciprocal.PNG')} style={{display:'block', margin:'auto'}}/>
        <form onSubmit={this.onSubmit} style={{textAlign:'center', marginLeft:'1em'}}>
          <TextField
            required
            id="username"
            label="Username"
            placeholder="Username"
            className={classes.textField}
            margin="normal"
            htmlFor="username"
            type="text"
            onChange={e => this.setState({username: e.target.value})}
          /><br/>
          <TextField
            required
            id="password"
            label="Password"
            placeholder="Password"
            className={classes.textField}
            margin="normal"
            htmlFor="password"
            type="password"
            onChange={e => this.setState({password: e.target.value})}
          /><br/>
          <TextField
            required
            id="firstName"
            label="First Name"
            placeholder="First Name"
            className={classes.textField}
            margin="normal"
            htmlFor="firstName"
            type="text"
            onChange={e => this.setState({firstName: e.target.value})}
          /><br/>
          <TextField
            required
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            className={classes.textField}
            margin="normal"
            htmlFor="lastName"
            type="text"
            onChange={e => this.setState({lastName: e.target.value})}
          /><br/>
          <TextField
            required
            id="email"
            label="Email"
            placeholder="Email"
            className={classes.textField}
            margin="normal"
            htmlFor="email"
            type="text"
            onChange={e => this.setState({email: e.target.value})}
          /><br/>
          <TextField
            required
            id="address1"
            label="Street Address"
            placeholder="Street Address"
            className={classes.textField}
            margin="normal"
            htmlFor="address1"
            type="text"
            onChange={e => this.setState({address1: e.target.value})}
          />
          <TextField
            required
            id="city"
            label="City"
            placeholder="City"
            className={classes.textField}
            margin="normal"
            htmlFor="city"
            type="text"
            onChange={e => this.setState({city: e.target.value})}
          />
          <TextField
            required
            id="state"
            label="State"
            placeholder="State"
            className={classes.textField}
            margin="normal"
            htmlFor="state"
            type="text"
            onChange={e => this.setState({state: e.target.value})}
          />
          <TextField
            required
            id="postalCode"
            label="Postal Code"
            placeholder="Zip Code"
            className={classes.textField}
            margin="normal"
            htmlFor="postalCode"
            type="text"
            onChange={e => this.setState({postalCode: e.target.value})}
          /><br/>
          <TextField
            required
            id="dateOfBirth"
            label="Date of Birth"
            placeholder="Date of Birth"
            className={classes.textField}
            margin="normal"
            htmlFor="dateOfBirth"
            type="text"
            onChange={e => this.setState({dateOfBirth: e.target.value})}
          /><br/>
          <TextField
            required
            id="ssn"
            label="SSN"
            placeholder="Last 4 Digits of SSN"
            className={classes.textField}
            margin="normal"
            htmlFor="ssn"
            type="password"
            onChange={e => this.setState({ssn: e.target.value})}
          /><br/>
          <TextField
            id="bio"
            label="Bio"
            placeholder="Tell us about yourself"
            className={classes.textField}
            margin="normal"
            htmlFor="bio"
            type="text"
            onChange={e => this.setState({bio: e.target.value})}
          /><br/>
          <TextField
            id="location"
            label="Location"
            placeholder="Where are you from?"
            className={classes.textField}
            margin="normal"
            htmlFor="location"
            type="text"
            onChange={e => this.setState({location: e.target.value})}
          /><br/>
          <TextField
            id="age"
            label="Age"
            placeholder="What's your age?"
            className={classes.textField}
            margin="normal"
            htmlFor="age"
            type="text"
            onChange={e => this.setState({age: e.target.value})}
          /><br/>
          <TextField
            style={{marginBottom:'0.8em'}}
            id="university"
            label="University"
            placeholder="Where do/did you go?"
            className={classes.textField}
            margin="normal"
            htmlFor="university"
            type="text"
            onChange={e => this.setState({univeristy: e.target.value})}
          /><br/>
          <Button type="submit" style={{marginBottom:'0.8em'}}>Register</Button><br/>
          <Link to="/login" style={{textDecoration:'none'}}><Button>Already have an account?</Button></Link>

      </form>
      </div>
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
