import React, { useState } from 'react';
import Avatar from 'react-avatar';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem
} from 'reactstrap';
const UserAvatar: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <NavItem>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                    <Avatar name="Ad Man" color='gray' size="30" round={true} />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>Perfil</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => { console.log('Logout'); }}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavItem>
    );
}

export default UserAvatar;
