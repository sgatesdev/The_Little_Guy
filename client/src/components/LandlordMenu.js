import React from 'react';
import { Link } from 'react-router-dom';

const LandlordMenu = () => {
    return(
        <>
        <li className="uk-parent">
        <Link to="/signup">Landlord Portal</Link>
        </li>
        <li className="uk-parent">
        <Link to="/signup">Profile</Link>
        </li>                        
        <li className="uk-parent">
        <Link to="/signup">Messages</Link>
        </li>    
        </>
    );
}

export default LandlordMenu;