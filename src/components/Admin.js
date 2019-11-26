import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import  '../componentsStyle/AdminStyle.css';
import '../componentsStyle/LoaderStyle.css';

import * as firebase from 'firebase';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            schools: null
        }
        
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let dbinfo;
        schoolRef.on('value', snap =>{
            dbinfo = snap.val();
            this.setState({
                schools: dbinfo,
                loaded: true
            })
        })
        
    }
    render() {
        let i = 1;
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        if(this.state.loaded){
            return (
                <div>
                    <h1 className='ff-c'>Усі школи і гупи</h1>
                    {
                    this.state.schools.map(item =>(
                    <div key={item.school}>
                        <h1 className='blue ff-c'>{item.school}</h1>
                        <div>
                            {item.groups.map(item =>(
                                <div key={item.name}>
                                    <h3 align='left' className='gray ff-c ml-30 mt-20'>
                                        <b>{item.name}</b> 	&nbsp;	&nbsp;
                                        [{item.temes_pass} - занять] (включно з пробним)
                                    </h3>
                                        <ListGroup horizontal >
                                            <ListGroup.Item className='width-50'><b>№</b></ListGroup.Item>
                                            <ListGroup.Item className='width-250'><b>Ім'я і Прізвище</b></ListGroup.Item>
                                            <ListGroup.Item className='width-250'><b>Номер телефону(пароль)</b></ListGroup.Item>
                                            <ListGroup.Item className='width-100'><b>Борг</b></ListGroup.Item> 
                                        </ListGroup>
                                    {item.pupils.map(breakpoint => (
                                        <ListGroup horizontal key={breakpoint.name}>
                                            {console.log(breakpoint)}
                                            <ListGroup.Item className='width-50'>{i++}</ListGroup.Item>
                                            <ListGroup.Item className='width-250'>{breakpoint.name}</ListGroup.Item>
                                            <ListGroup.Item className='width-250'>{breakpoint.password}</ListGroup.Item>
                                            <ListGroup.Item className='width-100'>{breakpoint.debt}</ListGroup.Item>
                                            
                                        </ListGroup>
                                    ))}
                                    <div style={{visibility: 'hidden'}}>{i = 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    ))
                    }
                    
                </div>
            );
        }
    }
}
export default Admin;