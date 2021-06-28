/**
 * very basic home page working
 */

import React from 'react';
import { Header } from '../components/Header';

export const Home = () => {
    return (
        <div>
            <Header />
            <div className="uk-heading-medium uk-margin-left">
                <h1>Home page!</h1>
            </div>
        </div>
    );
}