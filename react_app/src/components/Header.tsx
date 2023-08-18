import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import Avatar from './Avatar';


const Header: React.FC = () => {
    return (
        <Navbar className='navbar' light expand="md" fixed="top">
            <NavbarBrand href="/">Ad-Man</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Avatar />
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default Header;
