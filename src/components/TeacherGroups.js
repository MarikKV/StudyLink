import React, {Component} from "react";
import * as firebase from 'firebase';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import '../componentsStyle/LoaderStyle.css';
import '../componentsStyle/HomeStyle.css';

class TeacherGroups extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            user: null,
            groups: [],
            schoolsInfo: [],
            pupilsNum: 0,
            school: null,
            newStudentName: '',
            newStudentPassword: '',
            reload: false
        }
        this.addTeme = this.addTeme.bind(this)
        this.delTeme = this.delTeme.bind(this)
        this.addStudent = this.addStudent.bind(this)
        this.newStudentName = this.newStudentName.bind(this)
        this.newStudentPassword = this.newStudentPassword.bind(this)
        this.delStudent = this.delStudent.bind(this)

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
            
        })
        setTimeout(()=>{
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
    newStudentName(e){
        this.setState({
            newStudentName: e.target.value
        })
    }
    newStudentPassword(e){
        this.setState({
            newStudentPassword: e.target.value
        })
    }
    addStudent(e){
        let group = e.target.value;
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let dbinfo, i = 0, j = 0, schoolId, groupId;
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
                        if(item.name === group){
                            groupId = j;
                            let link = 'schools/'+schoolId+'/groups/'+groupId+'/pupils/'+item.pupils.length;
                            console.log( link, 'school - ', i, 'group - ',j)
                            firebase.database().ref(link).update({
                                debt: "",
                                name: this.state.newStudentName,
                                password: this.state.newStudentPassword,
                                phone: this.state.newStudentPassword
                            })
                        }
                        j++
                    })
                }
                i++
            })}, 300)
    }
    delStudent(e){
        let user = JSON.parse(e.target.value);

        if(window.confirm("Delete user " + user.name + "?")){
            const rootRef = firebase.database().ref();
            const schoolRef = rootRef.child('schools');
            let dbinfo, i = 0, j = 0, schoolId, groupId;
            schoolRef.on('value', snap =>{
                dbinfo = snap.val();
                this.setState({
                    schoolsInfo: dbinfo
                })
            })
            
            
            dbinfo.map(item=>{
                if(item.school === this.state.user.school){
                    schoolId = i;
                    item.groups.map(item=>{
                        if(item.name === user.group){
                            groupId = j;
                        }
                        j++
                    })
                }
                i++
            })

            let link = 'schools/'+schoolId+'/groups/'+groupId+'/pupils/'+user.i;
           
            firebase.database().ref(link).remove();
            console.log('link', link, 'removed user');
           
            setTimeout(()=>{
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
            }, 1000)

        }else{
            console.log("user not deleted")
        }
        
    }
    render(){
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        if(this.state.loaded){
            return (
                <div>
                    <h1>Редагування груп вчителя - {this.state.user.name} у закладі - {this.state.user.school}</h1>
                    <h2>Пройдені теми по групам</h2>
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
                    <h2>Добавити учня у групу</h2>
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
                                </ListGroup>
                                {item.pupils.map((pupil, inex)=>( 
                                <ListGroup horizontal key={pupil.name}>
                                    <ListGroup.Item className='width-250'>{pupil.name}</ListGroup.Item>
                                    <ListGroup.Item className='width-250'>
                                        {pupil.phone}
                                    </ListGroup.Item>
                                    <ListGroup.Item className='width-150'>
                                        <button value={JSON.stringify({name: pupil.name, group: item.name, i: inex})} onClick={this.delStudent}>Видалити учня</button>
                                    </ListGroup.Item>
                                </ListGroup>
                                ))
                                }
                                <ListGroup horizontal>
                                    <ListGroup.Item className='width-250'>
                                        <input type="text" placeholder="Ім'я і прізвище" onChange={this.newStudentName}/>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='width-250'>
                                        <input type="text" placeholder="Телефон(пароль)" onChange={this.newStudentPassword}/>
                                    </ListGroup.Item>
                                </ListGroup>
                                <br />
                                <button value={item.name} onClick={this.addStudent}>Додати учня</button>
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
export default TeacherGroups;