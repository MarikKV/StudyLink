import React, {Component} from "react";
import * as firebase from 'firebase';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import '../componentsStyle/LoaderStyle.css';
import '../componentsStyle/HomeStyle.css';

class HomeTeacher extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            user: null,
            groups: [],
            schoolsInfo: [],
            pupilsNum: 0,
            school: null
        }
        this.addTeme = this.addTeme.bind(this)
        this.delTeme = this.delTeme.bind(this)
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let user = JSON.parse(localStorage.getItem('studyLinkuser'));
        let schoolsInfo, allPupilsNum = 0;
        schoolRef.on('value', snap =>{
            schoolsInfo = snap.val()
            //console.log(schoolsInfo)
            this.setState({
                schoolsInfo: schoolsInfo,
                user: user
            })
            this.state.schoolsInfo.map(item=>{
                if(item.school === user.school){
                    item.groups.map(item=>{
                        allPupilsNum += item.pupils.length
                    })
                    this.setState({
                        groups: item.groups,
                        pupilsNum: allPupilsNum
                    })
                    allPupilsNum = 0;
                }
            })
        })
        setTimeout(()=>{
            this.setState({
            user: user,
            loaded: true
        })
        }, 1500)
    }
    addTeme(e){
        let x = e.target.value;
        //console.log('add teme',this.state.user.school, x);
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let dbinfo, i = 0, j = 0, schoolId, groupId, temesPass;
        schoolRef.on('value', snap =>{
            dbinfo = snap.val();
            this.setState({
                school: dbinfo
            })
        })
        setTimeout(()=>{
            dbinfo.map(item=>{
                console.log(item)
                if(item.school === this.state.user.school){
                    schoolId = i;
                    item.groups.map(item=>{
                        if(item.name === x){
                            groupId = j;
                            temesPass = item.temes_pass + 1;
                            let link = 'schools/'+schoolId+'/groups/'+groupId;
                            console.log(link)
                            firebase.database().ref(link).update({
                                temes_pass: temesPass
                            })
                        }
                        j++
                    })
                }
                i++
            })}, 300)
    }
    delTeme(e){
        let x = e.target.value;
        //console.log('add teme',this.state.user.school, x);
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let dbinfo, i = 0, j = 0, schoolId, groupId, temesPass;
        schoolRef.on('value', snap =>{
            dbinfo = snap.val();
            this.setState({
                school: dbinfo
            })
        })
        setTimeout(()=>{
            dbinfo.map(item=>{
                console.log(item)
                if(item.school === this.state.user.school){
                    schoolId = i;
                    item.groups.map(item=>{
                        if(item.name === x){
                            groupId = j;
                            temesPass = item.temes_pass - 1;
                            let link = 'schools/'+schoolId+'/groups/'+groupId;
                            console.log(link)
                            firebase.database().ref(link).update({
                                temes_pass: temesPass
                            })
                        }
                        j++
                    })
                }
                i++
            })}, 300)
    }
    render(){
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        if(this.state.loaded){
            return (
                <div>
                    <h1>Hello teacher {this.state.user.name}! Учнів у закладі - {this.state.pupilsNum}</h1>
                    <h2>Пройдені теми по групам</h2>
                    <div className='center'>
                    <ListGroup horizontal >
                        <ListGroup.Item className='width-250'><b>Назва групи</b></ListGroup.Item>
                        <ListGroup.Item className='width-250'><b>Кількість учнів</b></ListGroup.Item>
                        <ListGroup.Item className='width-250'><b>Пройдено тем</b></ListGroup.Item>
                        <ListGroup.Item className='width-250'><b>Змінити кількість тем</b></ListGroup.Item> 
                    </ListGroup>
                    {this.state.groups.map(item=>(
                        <ListGroup horizontal key={item.name}>
                            <ListGroup.Item className='width-250'>{item.name}</ListGroup.Item>
                            <ListGroup.Item className='width-250'>{item.pupils.length}</ListGroup.Item>
                            <ListGroup.Item className='width-250'>{item.temes_pass}</ListGroup.Item>
                            <ListGroup.Item className='width-250'>
                                <button value={item.name} onClick={this.addTeme}>+</button>
                                <button value={item.name} onClick={this.delTeme}>-</button>
                            </ListGroup.Item>
                        </ListGroup>
                    ))
                    }
                    </div>
                    <br/><br/><br/>
                    <h2>У планах</h2>
                    <h2>Оцінки</h2>
                    <Accordion defaultActiveKey="0" align='left'>
                    {this.state.groups.map(item=>(
                    
                            <Card key={item.name}>
                                <Accordion.Toggle as={Card.Header} eventKey={item.name}>
                                    {item.name}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={item.name}>
                                <Card.Body>
                                <ListGroup horizontal >
                                    <ListGroup.Item className='width-250'><b>Ім'я Прізвище</b></ListGroup.Item>
                                    <ListGroup.Item className='width-150'><b>Заняття №</b></ListGroup.Item>
                                </ListGroup>
                                {item.pupils.map(item=>(
                                    <ListGroup horizontal key={item.name}>
                                    <ListGroup.Item className='width-250'>{item.name}</ListGroup.Item>
                                    <ListGroup.Item className='width-150'>
                                        <input type='text' className='width-50' />
                                        <button value={item.name}>+</button>
                                        <button value={item.name}>-</button>
                                    </ListGroup.Item>
                                </ListGroup>
                                ))
                                }
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                    ))
                    } 
                    </Accordion>
                    
                    <h2>Внести заборгованість</h2>

                    <Accordion defaultActiveKey="0" align='left'>
                    {this.state.groups.map(item=>(
                    
                            <Card key={item.name}>
                                <Accordion.Toggle as={Card.Header} eventKey={item.name}>
                                    {item.name}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={item.name}>
                                <Card.Body>
                                <ListGroup horizontal >
                                    <ListGroup.Item className='width-250'><b>Ім'я Прізвище</b></ListGroup.Item>
                                    <ListGroup.Item className='width-250'><b>Номер телефону</b></ListGroup.Item>
                                    <ListGroup.Item className='width-150'><b>Борг</b></ListGroup.Item>
                                    <ListGroup.Item className='width-200'><b>Оплата</b></ListGroup.Item>
                                </ListGroup>
                                {item.pupils.map(item=>(
                                    <ListGroup horizontal key={item.name}>
                                    <ListGroup.Item className='width-250'>{item.name}</ListGroup.Item>
                                    <ListGroup.Item className='width-250'>{item.phone}</ListGroup.Item>
                                    <ListGroup.Item className='width-150'>{item.debt === '' ? <b>Оплачено</b> : item.debt}</ListGroup.Item>
                                    <ListGroup.Item className='width-200'>
                                        <input type='text' className='width-50' />
                                        <button value={item.name}>Додати</button>
                                    </ListGroup.Item>
                                </ListGroup>
                                ))
                                }
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                    ))
                    } 
                    </Accordion>
                </div>
            )
        } 
    }
}
export default HomeTeacher;