import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import  '../componentsStyle/AdminStyle.css';
import '../componentsStyle/LoaderStyle.css';

import * as firebase from 'firebase';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            schools: null,
            passCheck: false,
            password: null,
            debtSum: ''
        }

        this.addTemes = this.addTemes.bind(this)
        this.delTemes = this.delTemes.bind(this)
        this.addSum = this.addSum.bind(this)
        this.addPay = this.addPay.bind(this)     
        this.onSubmit = this.onSubmit.bind(this) 
        this.changePassword = this.changePassword.bind(this) 
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        const adminRef = rootRef.child('admin');
        let dbinfo, admininfo;
        schoolRef.on('value', snap =>{
            dbinfo = snap.val();
            this.setState({
                schools: dbinfo,
                loaded: true
            })
        })
        adminRef.on('value', snap =>{
            admininfo = snap.val();
            //console.log(admininfo)
            this.setState({
                adminPassword: admininfo.password
            })
        })
        
    }
    addTemes(e){
        //console.log('add teme',e.target.value)
        let et = e.target.value;
        let school = et[0];
        let group = et[1];
        let newtemes = 0;
        if(et.length === 3){
            newtemes = Number.parseInt(et[2]) + 1;
        }
        if(et.length === 4){
            newtemes = Number.parseInt(et[2]+et[3]) + 1;
        }
        let link = 'schools/'+school+'/groups/'+group;
        //console.log(link)
        firebase.database().ref(link).update({
            temes_pass: newtemes
        })
    }
    delTemes(e){
        let et = e.target.value;
        let school = et[0];
        let group = et[1];
        let newtemes = 0;
        if(et.length === 3){
            newtemes = Number.parseInt(et[2]) - 1;
        }
        if(et.length === 4){
            newtemes = Number.parseInt(et[2]+et[3]) - 1;
        }
        let link = 'schools/'+school+'/groups/'+group;
        //console.log(link)
        firebase.database().ref(link).update({
            temes_pass: newtemes
        })
    }
    addPay(e){
        //console.log(e.target.value)
        let et = e.target.value;
        let school = et[0];
        let group = et[1];
        let pupil;
        if(et.length === 3){
            pupil = Number.parseInt(et[2]) - 2;
        }
        if(et.length === 4){
            pupil = Number.parseInt(et[2]+et[3]) - 2;
        }
        let link = 'schools/'+school+'/groups/'+group+'/pupils/'+pupil;
        firebase.database().ref(link).update({
            debt: this.state.debtSum
        })
        this.setState({
            debtSum: ''
        })
        //console.log(school, group, pupil, 'DATA')
    }
    addSum(e){
        this.setState({
            debtSum: e.target.value
        })
        //console.log(this.state.debtSum)
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.adminPassword === this.state.password){
            this.setState({
                passCheck: true
            })
        }
    }
    changePassword(e) {
        //console.log(e.target.value)
        this.setState({
            password: e.target.value
        })
    }
    
    render() {
        let i = 1, newschool = 0, newgroup = 0;
        if(!this.state.loaded && this.state.passCheck===false){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        if(this.state.loaded && this.state.passCheck===false){
            return (
                <Form onSubmit={this.onSubmit} className='w-50'>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Введіть пароль адміна</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.changePassword}/>
                    </Form.Group>
                   
                    <Button variant="primary" type="submit">
                        Увійти
                    </Button>
                </Form>
              )
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
                                        [{item.temes_pass} - занять
                                        <button value={newschool+''+newgroup+''+item.temes_pass} onClick={this.addTemes}>+</button>
                                        <button value={newschool+''+ newgroup+''+item.temes_pass} onClick={this.delTemes}>-</button>
                                        ] (включно з пробним)
                                    </h3>
                                        <ListGroup horizontal >
                                            <ListGroup.Item className='width-50'><b>№</b></ListGroup.Item>
                                            <ListGroup.Item className='width-250'><b>Ім'я і Прізвище</b></ListGroup.Item>
                                            <ListGroup.Item className='width-250'><b>Номер телефону(пароль)</b></ListGroup.Item>
                                            <ListGroup.Item className='width-150'><b>Борг</b></ListGroup.Item>
                                            <ListGroup.Item className='width-250'><b>Виписати борг</b></ListGroup.Item> 
                                        </ListGroup>
                                    {item.pupils.map(breakpoint => (
                                        <ListGroup horizontal key={breakpoint.name}>
                                            <ListGroup.Item className='width-50'>{i++}</ListGroup.Item>
                                            <ListGroup.Item className='width-250'>{breakpoint.name}</ListGroup.Item>
                                            <ListGroup.Item className='width-250'>{breakpoint.password}</ListGroup.Item>
                                            <ListGroup.Item className='width-150'>
                                                {(breakpoint.debt !== '') ? 
                                                <span className='red'><b>{breakpoint.debt}</b></span> : 
                                                <span className='green'><b>оплaчено</b></span>}
                                            </ListGroup.Item>
                                            <ListGroup.Item className='width-250'>
                                                <input type='text' placeholder='сума боргу' className='width-100' onChange={this.addSum}/>
                                                <button  value={newschool+''+ newgroup+''+i} onClick={this.addPay}>Додати</button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    ))}
                                    <div style={{visibility: 'hidden'}}>{i = 1} {newgroup++}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{visibility: 'hidden'}}>{newschool++}{newgroup = newschool - 1}</div>
                    </div>
                    ))
                    }
                    
                </div>
            );
        }
    }
}
export default Admin;