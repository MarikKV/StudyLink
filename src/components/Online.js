import React, {Component} from "react";
import * as firebase from 'firebase';
import '../componentsStyle/LoaderStyle.css';
import '../componentsStyle/Online.css';
import skype1 from '../images/skype1.png';
import skype2 from '../images/skype2.png';
import skype3 from '../images/skype3.png';
import files from '../images/files.png';
import save from '../images/save.png';
import saveas from '../images/saveas.png';
import klava from '../images/klava.jpg';

class Online extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            online: null,
            user: '',
            onlineHref: ''
        }
        
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const onlineRef = rootRef.child('online');
        let user = JSON.parse(localStorage.getItem('studyLinkuser'));
        let dbinfo;
        onlineRef.on('value', snap =>{
            dbinfo = snap.val()
            this.setState({
                online: dbinfo
            }) 
        })
        setTimeout(()=>{
            this.state.online.map(item=>{
                if(item.name === user.group){
                    this.setState({
                        onlineHref: item.href
                    })
                }
            })
            this.setState({
                loaded: true
            })
        }, 2500)
    }
    render(){
     
        if(!this.state.loaded){
            return <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
        if(this.state.loaded){
            return (
                <div className="padd">
                    <h3 className="goSkypeH">
                        Для переходу розмови групи {this.state.user.group} у skype перейдіть за посиланням - 
                        <a className="goSkype" href={this.state.onlineHref}>Перейти у Skype</a>
                    </h3>

                    <h3 className="goSkypeH">
                        Також, серед тижня, будуть відбуватись безкоштовні заняття по 30хв. На яких розбиратимуться домашні завдання або повторюватименься остання пройдена тема.
                        <br/><br/>
                        Точна дату та час проведення додаткового заняття буде надаватсь у вайбері за день до проведення.
                    </h3>

                    <h3 className="goSkypeH2">
                        Що робити якщо я пропустив/пропустила заняття?
                    </h3>
                    <h4 className="goSkypeH3" align="left">
                        Усі заняття повністю записуються у скайпі. Після заняття відео можна переглянути у групі в скайпі. Якщо ви запізнилися чи пропустили заняття тоді потрібно зробитити такі кроки:
                        <br/><br/>
                        1) Перейти за посиланням (зверху на цій сторінці або у групі вайбер) у розмову в СКАЙПІ.
                        <br/>
                        2) Написати у чат групи прізвище учня (бажано написати яке заняття ви прпустили - звичайне чи додаткове). 
                        <br/><br/>
                        Вчитель надішле вам відео з уроком в особисті повідомлення. З питаннями щодо пропущених тем можете звертатись до вчителя у вайбері або на додаткових заняттях серед тижня.
                        
                    </h4>

                   <br/><br/>
                   <h2>Що потрібно знати до заняття?</h2>
                   <br/>
                   <ol align="left">
                       <li>Як вимкнути/увімкнути відео/звук у скайп? У якийх випадках це потрібно робити?</li>
                       <li>Як зробити скріншот (знімок екрану)?</li>
                   </ol>
                   <br/>
                    <div className="skypeBlock1">
                        <h3>Як вимкнути/увімкнути відео/звук у скайп? У якийх випадках це потрібно робити?</h3>

                        <p align="justify">
                            <img src={skype1} align="right" alt='skype1' width='30%'/>Для заняття учителю не обов'язково вас бачити, тому передачу відео можна вимкнути як зображено на фото зправа. Також можна вимкнути звук (тільки якщо у вас шумно на фоні, щоб не мішати вчителю та іншим учням. У такому разі звук можна вмикати, щоб задати вчителю питання чи відповісти на питання вчитля). Ні в якому разі не потрібно соромитись задавати питаня вчителю. Помилки та проблеми виникають часто. Головне швидко їх виправтити в цьому полягає одне з завдань вчителя - швидко допомогти учневі виправити помилку/проблему, щоб у майбутньому знати її рішення. 
                        </p>
                    </div>

                    <div className="skypeBlock2">
                        <h3>Як зробити скріншот (знімок екрану)?</h3>
                    
                        <p align="justify">
                            Для перевірки виконання завдань учням потрібно буде надсилати знімки робочого столу у чат для перевіки вчителю. Якщо у вас Windows 10 можна використати комбінацію клавіш - WIN + PRT SC (як на фото). Зображення збережеться у пам'ять комп'ютера. Далі його можна вставити у чат комбінацією клавіш - Ctrl + V (або правою кнопкою миші, а далі 'вставити'). Якщо у вас інший Windows детальніше про те як можна робити скріншот можна прочитати <a href="https://www.samsung.com/ru/support/computing/how-to-take-a-screenshot-on-a-windows-computer-or-laptop/">тут</a>.  
                            Прохання спробувати зробити скріншоти вдома, а якщо у вас виникнуть проблеми чи питання писати вашому вчителю у вайбер.
                            
                        </p>
                        <p>
                            <img src={klava} align="left" alt='klava' width='30%' className="m-t-x"/>
                            <img src={skype2} align="left" alt='skype1' width='30%'/>
                            <img src={skype3} align="left" alt='skype1' width='30%'/>
                        </p>
                    </div>
                    <br/>
                   <h2>Часті проблеми та помилки</h2>
                   <br/>
                   <ol align="left">
                       <li>Не бачу розширення файлів після збереження (.html, .css, .png,...)</li>
                       <li>Не знаю куди зберіг/зберегла файл</li>
                   </ol>

                   <div className="skypeBlock1">
                        <h3>Не бачу розширення файлів після збереження (.html, .css, .png,...)</h3>

                        <p align="justify">
                           Якщо у вас Windows 10 то достатньо відкрити папку з файлами та у контекстному меню клікнути 'Вигляд'. Далі поставити галочку у пункті 'Розширення імен файлів' (як це вказано на зображенні)
                        </p>
                        <p align="center">
                            <img src={files} alt='files' width='70%'/>
                        </p>
                        <p>
                           Якщо Ви користуєтесь іншим Windows як увімкнути розширення файлів можна глянути <a href="https://it-tehnolog.com/windows/pokazuvati-rozshirennya-fayliv-v-windows">тут</a>.
                           <br/>
                           <br/>
                           Або у цьому відео
                           <br/>
                           <iframe title="videow7" width="560" height="315" src="https://www.youtube.com/embed/RGTznA1IRDw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </p>
                        <p>
                            Якщо після збереження файлу Notepad++ не зберігає розширення файлу яке ви вибрали спробуйте записувати його відразу у назві файлу. Для прикладу - 'z1.html' у полі назви файлу.
                            <img src={save} alt='files' width='60%'/>
                        </p>
                    </div>


                    <div className="skypeBlock1">
                        <h3>Не знаю куди зберіг/зберегла файл</h3>
                        <p align="center">
                           Файл завжди можна зберегти повторно або навіть замінити при збереженні вже існуючий.<br/> У Notepad++ натисніть 'Файл'>'Зберегти як' і знову вкажіть місце збереження і назву файлу.
                           
                        </p>
                        <p align="center">
                            <img src={saveas} alt='files' width='40%'/>
                        </p>
                    </div>

                </div>
            )
        } 
    }
}
export default Online;