import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';

class App extends Component {
  renderCustomerListContainer = () => <h1> Customer List Container</h1>

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/customers" component={CustomersContainer} />
          <Switch>
            <Route path="/customers/new" component={NewCustomerContainer} />
            {/* <Route path="/customers/:dni" component={CustomerContainer} /> */}
            <Route path="/customers/:dni" render={props => <CustomerContainer dni={props.match.params.dni}/>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
