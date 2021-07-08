import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
// using redux hooks api
import { useSelector, useDispatch } from 'react-redux';

// get logout action
import { LOG_OUT } from '../store/actions';

// use history to redirect user
import history from '../config/history';

// import localstorage actions
import { expiredToken, getToken, removeToken } from '../utils/token';
// import LandlordMenu from './LandlordMenu';
// import TenantMenu from './TenantMenu';

// import apollo query
import { QUERY_ME } from '../apollo-client/queries';


const menu = [
  { name: 'Home', to: '/', current: true },
  { name: 'About', to: '/about', current: false },
  { name: 'SignUp', to: '/signup', current: false },
  { name: 'Login', to: '/login', current: false },
]
const tenantMenu = [
    { name: 'Home', to: '/', current: true },
    { name: 'Tenant Portal', to: '/tenant', current: false },
    {name: 'Saved Properties', to: '/tenant/saved', current: false },
    {name: 'Profile', to: '/tenant/profile', current: false },
    {name: 'Messages', to: '/messages', current: false },
    { name: 'About', to: '/about', current: false },
    { name: 'Logout', to: '/', current: false },
  ]
  const landlordMenu = [
    { name: 'Home', to: '/', current: true },
    { name: 'Landlord Portal', to: '/tenant', current: false },
    {name: 'My Properties', to: '/tenant/saved', current: false },
    {name: 'Profile', to: '/tenant/profile', current: false },
    {name: 'Messages', to: '/messages', current: false },
    { name: 'About', to: '/about', current: false },
    { name: 'Logout', to: '/', current: false },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export const Header = () => {
    // redux 
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    // hook to get user info (if redux store is empty AND token in local storage)
    const [getMe, { data, called }] = useLazyQuery(QUERY_ME);

    // if user is logged out, check to see if token in local storage - then log them in automatically
    // this prevents a hard refresh from logging user out!
    useEffect(() => {
        if(!state.user) {
            console.log('here')
            const token = getToken();

            if(token && !expiredToken(token)) {
                // get user info using token and update state
                getMe();
                
                if (called && data) {
                //   send user data to redux so all components can see it
                    dispatch({
                        type: 'LOG_IN',
                        payload: { ...data.me }
                    });
                }
            }
        }
    }, [getMe, data, called, state.user, dispatch]);

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

        // redirect user to login
        history.push('/login');
    }

    const renderMenu = () => {
        if(state.user && state.user.is_landlord) {
            return(
                <>
                {landlordMenu.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  </>
            );
        }
        else if (state.user && !state.user.is_landlord) {
            return(
                <>
                {tenantMenu.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  </>
            );
        }
        else {
            return(
                <>
                {menu.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  </>
            );
        }
    }

    return (

    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a className=" text-white px-3 py-2 rounded-md text-sm font-medium">The Little Guy</a>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {
                    renderMenu()
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {
              renderMenu()
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
        // </>
    // );
}