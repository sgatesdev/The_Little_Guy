import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LOG_OUT } from '../store/actions';

// using redux hooks api
import { useSelector, useDispatch } from 'react-redux';

// use history to redirect user
import history from '../config/history';

// import localstorage actions
import { expiredToken, getToken } from '../utils/token';
import LandlordMenu from './LandlordMenu';
import TenantMenu from './TenantMenu';

export const Header = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    // if user is logged out, check to see if token in local storage - then log them in automatically
    // this prevents a hard refresh from logging user out!
    useEffect(() => {
        if(!state.user) {
            const token = getToken();

            if(token && !expiredToken(token)) {

                // get user info using token and update state

            }
        }
    }, []);

    /**
     * FOR DEBUGGING: 
     */
    console.log(state)


    const handleLogout = () => {
        // TO DO: destroy token in local storage

        dispatch({
            type: LOG_OUT
        });

        history.push('/login');
    }

    const renderMenu = () => {
        if(state.user && state.user.isLandlord) {
            return(
                <>
                <LandlordMenu />
                <li className="uk-parent">
                <Link to="#" onClick={handleLogout}>Logout</Link>
                </li>
                </>
            );
        }
        else if (state.user && !state.user.isLandlord) {
            return(
                <>
                <TenantMenu />
                <li className="uk-parent">
                <Link to="#" onClick={handleLogout}>Logout</Link> 
                </li>
                </>
            );
        }
        else {
            return(
                <>
                <li className="uk-parent">
                <Link to="/login">Login</Link>
                </li>
                <li className="uk-parent">
                <Link to="/signup">Sign Up</Link>
                </li>
                </>
            );
        }
    }

    return (
        <>
        <nav className="uk-navbar-container" uk-navbar>
            <div className="uk-navbar-left">
                <ul class="uk-navbar-nav uk-animation-fade">
                    <li className="uk-active"><Link to="/">The Little Guy</Link></li>
                    <li className="uk-active"><Link to="/">Home</Link></li>
                    {
                        renderMenu()
                    }
                </ul>
            </div>
        </nav>
        </>
    );
}