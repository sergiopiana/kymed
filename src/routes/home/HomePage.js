import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Home from '../../containers/Home';
import s from './HomePage.css';
import * as authActions from '../../ducks/auth';
import AltaForm from '../../containers/FormAlta';
import LoginHome from '../../containers/loginHome';

class HomePage extends React.Component {
 
  render() {
    if (_.isEmpty(this.props.auth)){
    return(
      <div className={s.root}>
        <div className="container-fluid">
        <LoginHome />        
        </div>
      </div>     
    )
    }
    return (
      <div className={s.root}>
        <div className="container-fluid">
         <Home />
         <AltaForm />
        </div>
      </div>
    );

  }
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, authActions)(HomePage);
