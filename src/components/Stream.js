import React, {Component} from "react";
import * as firebase from 'firebase';
import '../componentsStyle/LoaderStyle.css';
import '../componentsStyle/Stream.css';

class Stream extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            userGroup: '',
            userSchool: '',
            username: 'користувач',
            userInfo: [],
            temesOpen: null,
            debt: null,
            allTemsPased: [],
            minTemesGroup: null,
            maxTemeGroup: null,
            streamUrl: ''
        }
        
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        const streamRef = rootRef.child('stream');
        let user = JSON.parse(localStorage.getItem('studyLinkuser'));
        let dbinfo, stream, minTem = 30, maxTem = 0;
        let allTemsPased = [];
        streamRef.on('value', snap =>{
            stream = snap.val();
            console.log(stream);
            this.setState({
                streamUrl: stream
            })
        })
        schoolRef.on('value', snap =>{
            dbinfo = snap.val()
            this.setState({
                userInfo: dbinfo
            })
            setTimeout(()=>{this.state.userInfo.map(item => {
                if(item.school === user.school){
                    item.groups.map(item => {
                        if(item.name === user.group){
                            item.pupils.map(item => {
                                if(item.name === user.name){
                                    this.setState({
                                        debt: item.debt
                                    })
                                }
                            })
                            //інфа про кількість тем відкритих і відвіданих занять
                            this.setState({
                                username: user.name,
                                temesOpen:  item.temes_open,
                                temesPass:  item.temes_pass,
                                allTemsPased: allTemsPased
                            })
                            
                        }
                        allTemsPased.push(item);
                        allTemsPased.map(item=>{
                            if(item.temes_pass < minTem){
                                minTem = item.temes_pass
                            }
                            if(item.temes_pass > maxTem){
                                maxTem = item.temes_pass
                            }
                        })
                        this.setState({ 
                            userGroup: user.group,
                            userSchool: user.school, 
                            minTemesGroup: minTem,
                            maxTemesGroup: maxTem,
                            loaded: true
                         })
                    })
                    
                }
            })}, 2000)
            
        })
        
    }
    render(){
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        if(this.state.loaded){
            return (
                <div>
                    <h3>Увага! У звязку з карантином учні довгий час не відвідували заняття.<br/> 
                        Тому ми вирішили провести <span className="green">безкоштовну</span> пряму трансляцію для повторення вивченого матеріалу.
                    </h3>

                    <h4 className="red">Стрім відбудеться 05.04.2020 ( у Неділю ). Початок трансляції 12:00.</h4>
                    
                    
                    <h4>Бажаємо вам міцного здоров'я! </h4>


                    <br/><br/><br/>
                    <h3>Стрім №1 (Теми 1-13)</h3>
                    <iframe title="video1" width="560" height="315" 
                    src="https://www.youtube.com/embed/kuiZLS-8Rjo" frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                    <br/><br/>
                    <h3>Стрім №2 (Теми 14-...)</h3>
                    <br/><br/>
                    <iframe title="video2" width="560" height="315" 
                        src="https://www.youtube.com/embed/fE7lYl2NRcE?start=530" 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>

                     </iframe>
                </div>
            )
        } 
    }
}
export default Stream;