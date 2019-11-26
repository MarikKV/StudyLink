import React, {Component} from "react";
import program from '../images/program.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null
        }
        
    }
    componentDidMount(){
        
    }
    render() {
        return ( 
           <div>
               <img src={program} alt='program'/>
           </div>
        );
    }
}

export default Landing;