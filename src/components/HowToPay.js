import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import pay from '../images/pay.jpg';


class HowToPay extends Component {
    constructor() {
        super();
        this.state = {
            loged: false
        }

    }
    componentDidMount(){
        this.setState({
            loaded: true
        })
    }
    
    render() {
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        else{
        return (
            <div>
                <h2>Для власників карти приватбанку є зручний спосіб оплати.</h2>
                <img src={pay} alt='how to pay'/>
            </div>
        );
        }
    }
}
export default HowToPay;