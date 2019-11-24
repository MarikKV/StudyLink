import React, {Component} from 'react';
import { HashRouter, Route} from "react-router-dom";
import HeaderContainer from './components/HeaderContainer';
import Home from './components/Home';
import Admin from './components/Admin';
import SignIn from './components/SignIn';
import Landing from './components/Landing';
import Temes from './components/Temes';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <HashRouter basename='/'>
              <div className="App" align='center'>
                  <Route path='/' component={HeaderContainer}/>

                  <Route exact path='/' component={Landing}/>

                  <Route exact path='/landing' component={Landing}/>

                  <Route exact path='/home' component={Home}/>

                  <Route exact path='/temes' component={Temes}/>

                  <Route exact path='/admin' component={Admin}/>

                  <Route path='/SignIn' component={SignIn}/>
              </div>
          </HashRouter>
        );
    }
}
export default App;