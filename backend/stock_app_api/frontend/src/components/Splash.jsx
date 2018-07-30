import React, { Component } from 'react';
import {connect} from 'react-redux';

class Splash extends React.Component{

    componentDidMount(){
        document.body.style.backgroundColor='white';
    }

    render(){

        return(
            <div>
                <div style={{marginTop:'3em'}}></div>
                <img src={require('../assets/Reciprocal.PNG')} style={{display:'block', margin:'auto'}}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
     
    }
  }

const mapDispatchToProps = dispatch => {
    return{

    }
}

// export default compose(
//     withStyles(styles),
//     connect(mapStateToProps, mapDispatchToProps)
//   )(Splash);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);