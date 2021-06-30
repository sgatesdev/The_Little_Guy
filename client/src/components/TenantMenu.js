import React from 'react';
import { Link } from 'react-router-dom';

const TenantMenu = () => {
    return(
        <>
        <li className="uk-parent">
        <Link to="/signup">Tenant Portal</Link>
        </li>
        <li className="uk-parent">
        <Link to="/signup">Saved Properties</Link>
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

export default TenantMenu;