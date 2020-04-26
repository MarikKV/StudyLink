import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../componentsStyle/HowToPayStyle.css';
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
            <div className="padd">
                <h3 align="justify">У зв'язку з переведенням рахунків на IBAN формат, клієнтам всіх банків, крім ПриватБанк незручно оплачувати навчання. Підбивши підсумки,ми вирішили спростити систему оплати і рекомендуємо наступне:
                </h3>
                
                <p className="QR-block" align="left">
                    <img src={pay} alt='how to pay' align='right' width="250px"/>
                    <div className="QR-text">1. Клієнтам Приватбанку оплачувати навчання за допомогою QR коду.</div>
                </p>
                <p className="bank-block bank-text" align="left">
                    2. Клієнтам інших банків оплачувати на сайті за <a className="go" href='https://next.privat24.ua/payments/dashboard/'>посиланням</a>.<br/> В формі пишите даний код ЄДРПОУ <span className="red">3580013618</span> , тисните пошук, вибираєте Руссу В.С., ФОП, інше (курси,...). Заповнюєте форму і відправляєте платіж.</p>
                <p className="comis-block bank-text" align="center">Комісія 1 грн,в незалежності від банку</p>
            </div>
        );
        }
    }
}
export default HowToPay;