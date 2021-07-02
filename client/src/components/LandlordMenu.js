import React from 'react';
import { Link } from 'react-router-dom';

const LandlordMenu = () => {
    return(
        <>
        <li className="uk-parent">
        <Link to="/landlord">Landlord Portal</Link>
        </li>
        <li className="uk-parent">
        <Link to="/landlord/profile">Profile</Link>
        </li>                        
        <li className="uk-parent">
        <Link to="/messages">Messages</Link>
        </li>    
        </>
    );
}

export default LandlordMenu;