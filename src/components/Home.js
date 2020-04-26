import React, {Component} from "react";
import * as firebase from 'firebase';
import '../componentsStyle/LoaderStyle.css';
import '../componentsStyle/HomeStyle.css';

class Home extends Component {
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
            maxTemeGroup: null
        }
        
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const schoolRef = rootRef.child('schools');
        let user = JSON.parse(localStorage.getItem('studyLinkuser'));
        let dbinfo, minTem = 30, maxTem = 0;
        let allTemsPased = [];
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
        /*let debtInfo;
        if(this.state.debt !== ''){
            debtInfo = <h2>Увага у вас є ззаборгованість <b className='red'>{this.state.debt}грн</b></h2>
        }
        if(this.state.debt === ''){
            debtInfo = <div></div>
        }*/
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        if(this.state.loaded){
            return (
                <div>
                    <h2 className='headerInfoUser'>Інформація про користувача</h2>
                    <div className='userInfo'>
                        <h2>Вітаю {this.state.username}!</h2>
                        <h3>Ви проходите курс HTML/CSS у групі {this.state.userGroup}.</h3>
                            <h3>
                                {(this.state.userGroup[6] === 's') ? <span>Неділя </span>: ''}
                                {(this.state.userGroup[6] === 'f') ? <span>П'ятниця </span>: ''}
                                {(this.state.userGroup[6] === null) ? <span>Субота </span>: ''}
                                {(this.state.userGroup[5] === '1' && this.state.userGroup[6] !== 'f') ? <span> 10:00</span>: ''}
                                {(this.state.userGroup[5] === '2' && this.state.userGroup[6] !== 'f') ? <span> 12:00</span>: ''}
                                {(this.state.userGroup[5] === '3' && this.state.userGroup[6] !== 'f') ? <span> 14:00</span>: ''}
                                {(this.state.userGroup[5] === '4' && this.state.userGroup[6] !== 'f') ? <span> 16:00</span>: ''}

                                {(this.state.userGroup[5] === '1' && this.state.userGroup[6] === 'f') ? <span> 16:30</span>: ''}
                                {(this.state.userGroup[5] === '2' && this.state.userGroup[6] === 'f') ? <span> 18:30</span>: ''}
                            </h3>
                        {/*<h3>Відбулось {this.state.temesPass} занять</h3>*/}

                        <h3 className="red">У звязку з карантином заняття відбуваються онлайн.<br/> Детельніше про навчання онлан можна дізнатись натиснувши вкладку "Онлайн навчання" зверху.</h3>
                    </div>
                    {/*
                    <h2 className='headerInfoGroups'>Інформація про групи у закладі {this.state.userSchool}</h2>
                    <div align='center' className='allGroups'>
                        { this.state.allTemsPased.map(item=>(
                            <div key={item.name} className='groups'>
                                У групі {item.name} відбулось: {item.temes_pass} занять.
                            </div>
                            ))
                        }
                    </div>
                    {(this.state.temesPass > this.state.minTemesGroup) ? (
                    <div>
                        <h2 className='headerInfoGroups'>Пропустили заняття?</h2>
                        <div className='userInfo'>
                            <h4>Відвідати пропущене заняття №{this.state.temesPass} можна у іншій групі вашого закладу</h4>
                            <h5 className='red'><span >Увага!!! </span>Пропускати заняття без важливої не можна. 
                            Кількість мість у групах обмежена. Про бажання прийти на пропущене 
                            заняття до іншої групи потрібно попередити вчителя.</h5>
                            <h4>Групи з якими можна буде відвідати пропущене заняття №{this.state.temesPass}:</h4>
                            
                            { this.state.allTemsPased.map(item=>(
                                <div key={item.name}>
                                    {(item.temes_pass < this.state.temesPass) ?
                                        <div>
                                            {(item.name[6] === 's') ? <h4>Неділя</h4>: <h4>Субота</h4>}
                                            <h5>
                                                Група {item.name} [&nbsp; час - 
                                                {(item.name[5] === '1') ? <span> 10:00</span>: ''}
                                                {(item.name[5] === '2') ? <span> 12:00</span>: ''}
                                                {(item.name[5] === '3') ? <span> 14:00</span>: ''}
                                                {(item.name[5] === '4') ? <span> 16:00</span>: ''}
                                                &nbsp;]
                                            </h5>
                                        </div> : <div></div>}
                                </div>
                                ))
                            }
                        </div>
                        <h3>Оплачено {Math.ceil(this.state.temesPass/4)*4} занять</h3>
                        <h3>Наступна оплата через {Math.ceil(this.state.temesPass/4)*4 - this.state.temesPass} заняття</h3>
                        {debtInfo}
                    </div>) : <div></div>}*/}
                </div>
            )
        } 
    }
}
export default Home;