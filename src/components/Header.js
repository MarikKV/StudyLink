import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../componentsStyle/Header.css';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loged: this.props.loged,
            username: this.props.username
        }

        this.onlogOut = this.onlogOut.bind(this)
    }
    componentDidMount(){
        if(this.props.username !== null){
            this.setState({loged: true})
        }
    }
    onlogOut(){
        this.props.updateLoged(false)
        window.location.href = '#/Landing';
        localStorage.removeItem('studyLinkuser');
    }
    render() {
        let menuUser, links;
        if(this.props.loged && this.props.usergroup !== null){
            menuUser = (
                <Nav>
                    <Nav.Link>Увійдено як {this.props.username}</Nav.Link>
                    <Nav.Link onClick={this.onlogOut}>Вийти</Nav.Link>
                </Nav>
                )
            links = (
                <Nav>        
                    <Nav.Link href="#/home">Головна</Nav.Link>
                    <Nav.Link href="#/temes">Навчання</Nav.Link>
                    <Nav.Link href="#/online">Онлайн навчання</Nav.Link>
                    <Nav.Link href="#/stream">Стрім(повторення)</Nav.Link>
                    <Nav.Link href="#/howtopay">Як оплатити?</Nav.Link>
                </Nav>
            )
            
        }
        if(this.props.loged && this.props.usergroup === null){
            menuUser = (
                <Nav>
                    <Nav.Link>Увійдено як {this.props.username}</Nav.Link>
                    <Nav.Link onClick={this.onlogOut}>Вийти</Nav.Link>
                </Nav>
                )
            links = (
                <Nav>        
                    <Nav.Link href="#/homeTeacher">Мої групи</Nav.Link>
                    <Nav.Link href="#/TeacherGroups">Додати/Видалити учня</Nav.Link>
                    <Nav.Link href="#/temes">Навчання</Nav.Link>
                    <Nav.Link href="#/online">Онлайн навчання</Nav.Link>
                    <Nav.Link href="#/stream">Стрім(повторення)</Nav.Link>
                </Nav>
            )
        }
        if(!this.props.loged){
            menuUser = (
                <Nav>
                    <Nav.Link href="#/SignIn">Увійти</Nav.Link>
                </Nav>
            )
        }
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                {console.log(this.props)}
            <Navbar.Brand href="#/landing">StudyLink</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {links}
                    </Nav>
                    {menuUser}    
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;