import React, {Component} from 'react';
import { HashRouter, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import HomeTeacher from './components/HomeTeacher';
import Admin from './components/Admin';
import SignIn from './components/SignIn';
import Landing from './components/Landing';
import Temes from './components/Temes';
import HowToPay from './components/HowToPay';


import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            loged: false
        }
        this.updateData = this.updateData.bind(this)
        this.updateLoged = this.updateLoged.bind(this)

    }
    componentDidMount(){
        if(this.props.username !== null){
        this.setState({ 
            loged: true,
            username: this.props.username,
            userschool: this.props.userschool,
            usergroup: this.props.usergroup,
         })
        }
    }
    updateData = (value) => {
        this.setState({ username: value, loged: true});
    }
    updateLoged = (value) => {
        this.setState({ loged: value});
    }
    render() {
        return (
            <HashRouter basename='/'>
              <div className="App" align='center'>
                  <Route path='/'  render={() => (<Header
                    username={this.state.username} 
                    loged={this.state.loged} 
                    updateLoged={this.updateLoged}
                    usergroup={this.props.usergroup}/>)
                  }/>

                  <Route exact path='/' component={Landing}/>

                  <Route exact path='/landing' component={Landing}/>

                  <Route exact path='/home' component={Home}/>

                  <Route exact path='/homeTeacher' component={HomeTeacher}/>

                  <Route exact path='/temes' component={Temes}/>

                  <Route exact path='/howtopay' component={HowToPay}/>

                  <Route exact path='/admin' component={Admin}/>

                  <Route path='/SignIn' render={() => (<SignIn updateData={this.updateData}/>)}/>
              </div>
          </HashRouter>
        );
    }
}
export default App;