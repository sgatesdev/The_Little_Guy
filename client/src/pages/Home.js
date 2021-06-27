/**
 * very basic home page working
 */

import React from 'react';
import { Header } from '../components/Header';

export const Home = () => {
    return (
        <div className="m-2">
            <Header />
            <div>
                <h1>Home page!</h1>
            </div>
        </div>
    );
}