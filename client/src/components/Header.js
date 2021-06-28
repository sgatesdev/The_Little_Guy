/**
 * i used bootstrap just to get a page up, this is not permanent! lol
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <>
        <nav className="uk-navbar-container" uk-navbar>
            <div className="uk-navbar-left">
                <ul class="uk-navbar-nav">
                    <li className="uk-active"><Link to="/">The Little Guy</Link></li>
                    <li className="uk-active"><Link to="/">Home</Link></li>
                    <li className="uk-parent"><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </nav>
    </>
    );
}