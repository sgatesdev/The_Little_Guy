import React from 'react';
import { Link } from 'react-router-dom';

const TenantMenu = () => {
    return(
        <>
        <li className="uk-parent">
        <Link to="/tenant">Tenant Portal</Link>
        </li>
        <li className="uk-parent">
        <Link to="/tenant/saved">Saved Properties</Link>
        </li>
        <li className="uk-parent">
        <Link to="/tenant/profile">Profile</Link>
        </li>                        
        <li className="uk-parent">
        <Link to="/messages">Messages</Link>
        </li>    
        </>
    );
}

export default TenantMenu;