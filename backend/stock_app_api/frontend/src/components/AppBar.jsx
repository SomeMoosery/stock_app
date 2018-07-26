import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {Link} from 'react-router-dom';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { auth } from '../actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {

  componentDidMount(){
      console.log(this.props);
  }

  render(){
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Loaning App
              </Typography>
              <Link to='/profile' style={{textDecoration:'none', color:'inherit'}}>
                  <Button color='inherit'>
                    <p>Profile</p>
                  </Button>
                </Link>
              <Button onClick={this.props.logout} color='inherit' >
                <p>Logout</p>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      );
  }
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
      logout: () => {
        dispatch(auth.logout());
      },
    }
  }

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(ButtonAppBar);