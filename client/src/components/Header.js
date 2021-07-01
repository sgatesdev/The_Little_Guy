import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

// using redux hooks api
import { useSelector, useDispatch } from 'react-redux';

// get logout action
import { LOG_OUT } from '../store/actions';

// use history to redirect user
import history from '../config/history';

// import localstorage actions
import { expiredToken, getToken, removeToken } from '../utils/token';
import LandlordMenu from './LandlordMenu';
import TenantMenu from './TenantMenu';

// import apollo query
import { QUERY_ME } from '../apollo-client/queries';

export const Header = () => {
    // redux 
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    // hook to get user info (if redux store is empty AND token in local storage)
    const [getMe, { data }] = useLazyQuery(QUERY_ME);

    // if user is logged out, check to see if token in local storage - then log them in automatically
    // this prevents a hard refresh from logging user out!
    useEffect(() => {
        if(!state.user) {
            const token = getToken();

            if(token && !expiredToken(token)) {
                // get user info using token and update state
                getMe();

                //   send user data to redux so all components can see it
                dispatch({
                    type: 'LOG_IN',
                    payload: { ...data }
                });
            }
        }
    }, [getMe, data, state.user, dispatch]);

    /**
     * FOR DEBUGGING: 
     */
    console.log(state)


    const handleLogout = () => {
        // destroy token
        removeToken();

        // destroy redux data for user
        dispatch({
            type: LOG_OUT
        });

        // redirect user to login page
        history.push('/login');
    }

    const renderMenu = () => {
        if(state.user && state.user.is_landlord) {
            return(
                <>
                <LandlordMenu />
                <li className="uk-parent">
                <Link to="#" onClick={handleLogout}>Logout</Link>
                </li>
                </>
            );
        }
        else if (state.user && !state.user.is_landlord) {
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