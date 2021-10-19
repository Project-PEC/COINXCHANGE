import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/page/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/page/Services';
import Products from './components/page/Products';
import SignUp from './components/page/SignUp';
import { ImageAnalyzer } from './components/ImageAnalyzer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/predict' component={ImageAnalyzer} />
        </Switch>
      </Router>
    </>
  );
}

export default App;