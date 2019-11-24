import React, {Component} from "react";
import Header from './Header';

class HeaderContainer extends Component {
    render() {
        return (
            <div>
                <Header signOut='false' />
            </div>
        );
    }
}
export default HeaderContainer;