import React, {Component} from "react";
import ReactWOW from 'react-wow';
import program from '../images/program.jpg';
import '../componentsStyle/LandingStyle.css';


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
               <div className="Block0">
                    <br/><br/><br/><br/><br/>
                    <ReactWOW animation='bounceInLeft' duration="2s">
                        <h1 className='logo'>Study Link</h1>
                    </ReactWOW>
                    <br/><br/>
                    <ReactWOW animation='bounceInRight' duration="2s">
                        <h2>Курси програмування</h2>
                    </ReactWOW> 
                </div>
                <div className='Block1'>
                    <ReactWOW animation='bounceInLeft' duration="2s">
                        <div className='w-50 float_left bg1'>
                            Умови: <br/>
                            Для дітей 11-14 років. <br/>
                            Заняття у компютерних класах з проектором. <br/>
                            Заняття відбуваються раз у тиждень. <br/>
                            Заняття триває - 1 годину 50 хвилин.
                        </div>
                    </ReactWOW>
                    <ReactWOW animation='bounceInRight' duration="2s">
                        <div className='w-50 float_left bg2'>
                            Навчимо: <br/>
                            Створювати web-сайти. <br/>
                            Мов: <a href="https://uk.wikipedia.org/wiki/HTML"><span className='html'>html</span></a>
                            , <a href="https://uk.wikipedia.org/wiki/CSS"><span className='css'>css</span></a>
                             та <a href="https://uk.wikipedia.org/wiki/JavaScript"><span className='js'>javascript</span></a>. <br/>
                            Користуватись <a href="https://uk.wikipedia.org/wiki/Git"><span className='git'>git</span></a>. <br/>
                            Користуватись додатковами програмами та сайтами для створення web-сторінок
                        </div>
                    </ReactWOW>
                    <ReactWOW animation='jackInTheBox' duration="2s">
                        <div className='w-100 float_left bg3'>Перше заняття безкоштовно!</div>
                    </ReactWOW>
                    <ReactWOW animation='rotateInUpLeft' duration="1s">
                        <div className='w-100 float_left bg4'>
                            <h1>По закінченю курсу ви отримуєте:</h1>
                            <h3>Знання необхідні у будь-якій сфері web-розробки</h3>
                            <h3>Роботи збережені у відкритому ресурсі</h3>
                            <h3>Курсову роботу яку не соромно розмістити у резюме</h3>
                            <h3>Сертифікат у разі успішного завершення курсу</h3>
                        </div>
                    </ReactWOW>
                </div>
               <img src={program} alt='program' width='100%'/>
           </div>
        );
    }
}

export default Landing;