import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomePage.css';
import Home from '../../containers/Home';
import AltaForm from '../../containers/FormAlta'
class HomePage extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className="container-fluid">
         <Home />
         <AltaForm />
        </div>
      </div>
    );

  }
}

export default withStyles(s)(HomePage);
