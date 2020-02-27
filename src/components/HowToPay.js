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
                <h5>ЄДРПОУ 3580013618</h5>

                <h5>У зв'язку з переведенням рахунків на IBAN формат, клієнтам всіх банків
                    , крім ПриватБанк незручно оплачувати навчання
                    . Підбивши підсумки,ми вирішили спростити систему оплати і рекомендуємо наступне.
                </h5>
                <ol align='left'>
                    <li>Клієнтам Приватбанку оплачувати навчання за допомогою QR коду. 
                        <img src={pay} alt='how to pay' align='right'/>
                    </li>
                    <li>Клієнтам інших банківw оплачувати на сайті за
                        <a href='https://next.privat24.ua/payments/dashboard/'>посиланням</a>
                        . В формі пишите наданий вище код ЄДРПОУ, тисните пошук, вибираєте Руссу В.С
                        ., ФОП, інше (курси,...).
                        Заповнюєте форму і відправляєте платіж.
                    </li>
                </ol>
                <h5>Комісія 1 грн,в незалежності від банку</h5>

                <h2>Для власників карти приватбанку є зручний спосіб оплати.</h2>
               
            </div>
        );
        }
    }
}
export default HowToPay;