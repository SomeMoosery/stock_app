import React, {Component} from "react";
import {connect} from "react-redux";

import Button from '@material-ui/core/Button';
import {Link, Redirect} from "react-router-dom";

import {auth} from '../actions';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';

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
    loading: true,
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  componentDidMount(){
    document.body.style.backgroundColor='white';
    setTimeout(() => this.setState({loading: false}), 2000);
  }

  render() {
    if (this.props.isAuthenticated) {
      window.location.reload();
      return <Redirect to="/" />
    }
    const { classes } = this.props;
    return (
        <div>
        <img src={require('../assets/Reciprocal.PNG')} style={{display:'block', margin:'auto'}}/>
        <form onSubmit={this.onSubmit} style={{textAlign:'center', marginLeft:'13em'}}>
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
          />
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
          />
          <Button type="submit">Log In</Button><br/>
          <div style={{height:'5em'}}></div>
          <Link to="/register" style={{textDecoration:'none'}}><Button>Don't have an account?</Button></Link>

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
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);