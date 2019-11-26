import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import '../componentsStyle/LoaderStyle.css';

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
        //console.log(user)
        let dbinfo, dbinfoSchools, temes_pass;
        
        schoolRef.on('value', snap =>{
            dbinfoSchools = snap.val();
            dbinfoSchools.map(item=>{
                if(item.school === user.school){
                    item.groups.map(item=>{
                        if(item.name === user.group){
                            temes_pass = item.temes_pass
                            this.setState({
                                temesOpen: item.temes_pass
                            })
                        }
                    })
                }
            })
        })
        temesRef.on('value', snap =>{
            dbinfo = snap.val();
            if(!this.state.loaded){
                while(dbinfo.length > temes_pass){
                    dbinfo.pop();
                    //console.log(dbinfo, temes_pass)
                }
                this.setState({
                    temes: dbinfo
                })
            }
            this.setState({
                username: user.name,
                loaded: true
            })
        })
    }
    render() {
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        else{
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