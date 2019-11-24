import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

import * as firebase from 'firebase';

class Temes extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            temes: null,
            username: null,
            temesOpen: null
        }
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const temesRef = rootRef.child('temes');
        const schoolRef = rootRef.child('schools');
        let user = JSON.parse(localStorage.getItem('studyLinkuser'));
        console.log(user)
        let dbinfo, dbinfoSchools;
        
        schoolRef.on('value', snap =>{
            dbinfoSchools = snap.val();
            //console.log(dbinfoSchools);
            dbinfoSchools.map(item=>{
                if(item.school === user.school){
                    //console.log(item.school)
                    item.groups.map(item=>{
                        if(item.name === user.group){
                            //console.log(item.name, item.temes_pass, item.temes_open)
                            this.setState({
                                temesOpen: item.temes_open
                            })
                        }
                    })
                }
            })
        })
        temesRef.on('value', snap =>{
            dbinfo = snap.val();
            console.log(dbinfo.length, dbinfo)
            while(dbinfo.length>this.state.temesOpen){
                dbinfo.pop();
            }
            console.log(dbinfo.length, dbinfo)

            this.setState({
                temes: dbinfo,
                username: user.name,
                loaded: true
            })
        })
    }
    render() {
        if(!this.state.loaded){
            return <div>Loading...</div>
        }
        if(this.state.loaded){
            return (
                <div>
                    <h1>Теми відкриті для {this.state.username}</h1>
                    <Accordion defaultActiveKey="0" align='left'>
                    {
                        this.state.temes.map(item=>(
                            <Card key={item.tema}>
                                <Accordion.Toggle as={Card.Header} eventKey={item.tema}>
                                    {item.tema}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={item.tema}>
                                <Card.Body>
                                    {(item.task[0] !== "") ? <div>
                                        <h5 align="left">Завдання</h5>
                                        <ol>
                                        {item.task.map(item =>(
                                            <li align='left' key={item}><a href={'https://kosaniakmarianone.github.io/' + item} target='blank'>Завдання</a></li>
                                        ))}
                                        </ol></div>: ''
                                    }
                                    {(item.materials !== "") ? <h5 align='left'><a href={item.materials} target='blank'>Матеріали</a></h5> : ''}
                                    {(item.video !== "") ? <h5 align='left'><a href={item.video} target='blank'>Відео</a></h5> : ''}
                                    {(item.video === "" && item.materials === "" && item.task[0] === "") ? 'Тема не відкрита, або розглядається лише на занятті': ''}
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))
                    }
                     </Accordion>
                </div>
            );
        }
    }
}
export default Temes;