import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PropertyCard from "../../components/PropertyCard";

export const Tenant = () => {
    const state = useSelector((state) => state);

    return state.user && state.user.current_property ? 
    (<PropertyCard property={state.user.current_property} />) :
    (<h1>False</h1>);
}
