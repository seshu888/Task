import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from "./Home";

const browserHistory = createBrowserHistory();

function App() {
  return (
  <Router history={browserHistory}>
    <Route path="/" component={Home} exact={true} />
  </Router>
  );
}

export default App;
