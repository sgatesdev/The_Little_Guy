import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LOG_OUT } from '../store/actions';

// using redux hooks api
import { useSelector, useDispatch } from 'react-redux';

// use history to redirect user
import history from '../config/history';

// import localstorage actions
import { expiredToken, getToken } from '../utils/token';

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

    const handleLogout = () => {
        // TO DO: destroy token in local storage

        dispatch({
            type: LOG_OUT
        });

        history.push('/login');
    }

    return (
        <>
        <nav className="uk-navbar-container" uk-navbar>
            <div className="uk-navbar-left">
                <ul class="uk-navbar-nav">
                    <li className="uk-active"><Link to="/">The Little Guy</Link></li>
                    <li className="uk-active"><Link to="/">Home</Link></li>
                    
                    {
                        state.user ? (
                            <>
                            <li className="uk-parent">
                            <Link to="/signup">Properties</Link>
                            </li>
                            <li className="uk-parent">
                            <Link to="/signup">Profile</Link>
                            </li>                        
                            <li className="uk-parent">
                            <Link to="/signup">Messages</Link>
                            </li>    
                            <li className="uk-parent">
                            <a onClick={handleLogout}>Logout</a> 
                            </li>
                            </>
                        ) : (
                            <>
                            <li className="uk-parent">
                            <Link to="/login">Login</Link>
                            </li>
                            <li className="uk-parent">
                            <Link to="/signup">Sign Up</Link>
                            </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
        </>
    );
}