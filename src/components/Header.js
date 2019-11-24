import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            login: null
        }
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#/landing">StudyLink</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#/home">Головна</Nav.Link>
                        <Nav.Link href="#/temes">Навання</Nav.Link>
                    </Nav>
                    {console.log(this.props)}

                    {(this.props !== 'false') ? <Nav>
                        <Nav.Link href="#/SignIn">Увійти</Nav.Link>
                    </Nav> : <Nav>
                        <Nav.Link href="#/SignIn">Вийти</Nav.Link>
                    </Nav>}
                    
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;