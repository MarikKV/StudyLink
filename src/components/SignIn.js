import React, {Component} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signOut: false,
            login: null,
            phone: '',
            password: '',
            schools: [],
            groups: [],
            group: '',
            school: '',
            groupSeleced: '',
            schoolChuse: false,
            status: null
        }
        this.statusSelect = this.statusSelect.bind(this);
        this.groupSelect = this.groupSelect.bind(this);
        this.schoolSelect = this.schoolSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let groups;
        let allSchools=[];
        schoolRef.on('value', snap => {
            groups = snap.val();
            groups.map(item => {
                allSchools.push(item.school)
            })
            this.setState({
                schools: allSchools
            })
        })
    }
    schoolSelect(e){
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let dbinfo;
        let allGroups=[];
        schoolRef.on('value', snap => {
            dbinfo = snap.val();
            dbinfo.map(item => {
                if(item.school === e.target.value){
                    item.groups.map(item => {
                        allGroups.push(item.name)
                    })
                } 
            })
        })
        this.setState({
            school: e.target.value,
            groups: allGroups,
            schoolChuse: true
        })
    }
    groupSelect(e){
        this.setState({
            group: e.target.value
        })
    }
    statusSelect(e){
        this.setState({
            status: e.target.value
        })
    }
    onPhoneChange(e) {
        this.setState({
            phone: e.target.value
        })
    }
    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        const teacherRef = rootRef.child('teachers');
        let dbinfo, dbinfoteacher;
        let userInfo={}; 
        
        if(this.state.status === 'Учень'){
        schoolRef.on('value', snap => {
            dbinfo = snap.val();
            dbinfo.map(item=>{
                if(item.school === this.state.school){
                    item.groups.map(item=>{
                        if(item.name === this.state.group){
                            item.pupils.map(item=>{
                                if(this.state.phone === item.phone && this.state.password === item.password){
                                    //console.log('loged', item); записуємо учня у локалстор
                                    userInfo.name = item.name;
                                    userInfo.school = this.state.school;
                                    userInfo.group = this.state.group;
                                    userInfo.phone = item.phone;
                                    userInfo.debt = item.debt;
                                    userInfo.password = item.password;
                                    //console.log(userInfo);
                                    localStorage.setItem('studyLinkuser', JSON.stringify(userInfo));
                                    window.location.hash = '#/home';
                                    this.setState({ signOut: true })
                                    //зміна пропсу у основній компоненті для зміни меню в залежності від залогованого учня
                                    this.props.updateData(item.name)
                                }else{
                                    this.setState({ login: false })
                                }
                            })
                        }
                    })
                }
            })
            }
        )}
        if(this.state.status === 'Вчитель'){
            teacherRef.on('value', snap => {
                dbinfoteacher = snap.val();
                dbinfoteacher.map(item=>{
                if(item.school === this.state.school){
                    console.log(item.name)
                    if(item.password === this.state.password){
                        console.log('pass good')
                    
                        userInfo.name = item.name;
                        userInfo.school = this.state.school;
                        userInfo.group = null;
                        userInfo.phone = null;
                        userInfo.debt = null;
                        userInfo.password = null;
                        userInfo.status = 'teacher';
                        console.log(userInfo);
                        localStorage.setItem('studyLinkuser', JSON.stringify(userInfo));
                        window.location.hash = '#/homeTeacher';
                        this.setState({ signOut: true })
                        //зміна пропсу у основній компоненті для зміни меню в залежності від залогованого учня
                        this.props.updateData(item.name)
                    }
                    else{
                        this.setState({ login: false })
                    }
                }
            })
        })
        }
    }
    render() {     
        let school, groupChuse, loginAndPass, faillogin;
        if(this.state.login === false){
            faillogin = <Alert variant='danger'>Невірний логін або пароль</Alert> 
            setTimeout( ()=>{
                faillogin = <div></div>
                this.setState({login: null})
            }, 3000);
        }
        if(this.state.login === true){
            faillogin = <div></div>
        }
        if(this.state.schoolChuse && 
            this.state.status !== 'Вчитель' && 
            this.state.status !== 'Адміністратор' &&
            this.state.status !== 'Call center'
            ){
            groupChuse = (
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Назва групи</Form.Label>
                    <Form.Control as="select" onChange={this.groupSelect}>
                        <option>Моя група</option>
                        {   
                            this.state.groups.map(item => 
                                <option key={item}>{item}</option>
                            ) 
                        }
                    </Form.Control>
                </Form.Group>
            )
        }
        if(
            (this.state.status === 'Вчитель'|| this.state.status === 'Учень')  && 
            this.state.school !== '' &&
            this.state.group !== ''
            ){
            loginAndPass = (
                <div>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                            name="name" 
                            type="text" 
                            placeholder="Enter phone" 
                            onChange={this.onPhoneChange}
                            value={this.state.phone} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.onPasswordChange}
                            value={this.state.password} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Увійти
                    </Button>
                </div>
            )
        }
        if(this.state.status === 'Вчитель' && this.state.schoolChuse !== false){
            loginAndPass = (
                <div>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Ваш вчительський пароль</Form.Label>
                        <Form.Control 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.onPasswordChange}
                            value={this.state.password} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                            Увійти
                    </Button>
                </div>
            )
        }
        if(this.state.status === 'Адміністратор'){
            loginAndPass = (
                <div>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password for admin</Form.Label>
                        <Form.Control 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.onPasswordChange}
                            value={this.state.password} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Увійти
                    </Button>
                </div>
            )
        }
        if(this.state.status === 'Call center'){
            loginAndPass = (
                <div>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password fot call center</Form.Label>
                        <Form.Control 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.onPasswordChange}
                            value={this.state.password} />
                    </Form.Group>
                
                    <Button variant="primary" type="submit">
                    Увійти
                    </Button>
                </div>
            )
        }
        if(this.state.status === 'Вчитель'|| this.state.status === 'Учень'){
            school = (
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Назва закладу</Form.Label>
                    <Form.Control as="select" onChange={this.schoolSelect}>
                            <option>Мій заклад</option>
                        {
                            this.state.schools.map(item => 
                                <option key={item}>{item}</option>
                            )
                        }
                    </Form.Control>
                </Form.Group>
            )
        }
        return ( 
            <div className="container w-50"> 
            <br />
                <Form onSubmit={this.onSubmit}>

                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Статус</Form.Label>
                        <Form.Control as="select" onChange={this.statusSelect}>
                                <option>Мій статус</option>
                                <option>Учень</option>
                                <option>Вчитель</option>
                                <option>Адміністратор</option>
                                <option>Call center</option>
                        </Form.Control>
                    </Form.Group>

                    {/*компонент для вибору закладу (школи)*/}
                    {school}

                    {/*компонент для вибору групи у даному закладі (школі)*/}
                    {groupChuse}

                    {/*помилка при невірному введеню логіна чи пароля*/}
                    {faillogin}

                    {/*логін і пароль відносно вибраного статусу*/}
                    {loginAndPass}
                    
                </Form>
            </div>
        );
    }
}

export default SignIn;