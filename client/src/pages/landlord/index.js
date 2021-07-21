// react imports
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux imports 
import { useDispatch, useSelector } from 'react-redux';

// apollo imports
import { useLazyQuery } from '@apollo/client';
import { QUERY_MY_PROPERTIES } from '../../apollo-client/queries';

// get redux action def 
import { FETCH_MY_PROPERTIES } from '../../store/actions';

// component imports
import PropertyList from '../../components/PropertyList';

const Landlord = () => {
    const properties = useSelector((state) => Object.values(state.landlord));
    const dispatch = useDispatch();

    // apollo
    const [fetchProperties, { loading, data }] = useLazyQuery(QUERY_MY_PROPERTIES);

    // pull property data on load, send to redux store
    useEffect(() => {
      fetchProperties();

        if(data) {
            dispatch({
                type: FETCH_MY_PROPERTIES,
                payload: data.myProperties
            })
        }
    }, [loading]); 

    return(
        <>
        <div className="bg-HDgray">
        <h1 className="text-2xl pt-4 text-center font-bold leading-tight">
            Manage Properties
        </h1>
        <h1 className="p-5 text-center">
            You can add a new property that you own, review applications for properties already on The Little Guy, or manage your properties below. 
        </h1></div>
          <div>

          <div className="bg-HDgray sm:max-w-full max-w-md rounded shadow-md">
            <div className="shadow-md">
              
              <Link to="/landlord/add" className="px-6 py-3 hover:bg-TLGOrange flex shadow-md"> 
                <div>
                    <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>        
                </div>
                <div className="pl-3">
                  <p className="text-sm font-semibold">
                    Add property
                  </p>
                </div>
              </Link>
  
              <Link to="/landlord/applications" className="px-6 py-3 hover:bg-TLGOrange flex shadow-md"> 
                <div>
                    <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm font-semibold">
                    Review applications
                  </p>
                </div>
              </Link>
  
            </div >
            <div className="">
            </div>
          </div>

          <div className="text-center p-12 bg-CPgray shadow-md">
              {
                  /** <PropertyList properties={properties} />  */
                  properties && !loading ? 
                  <PropertyList properties={properties} isLandlord={true}/>  : (<h1>You don't have any properties to manage yet!</h1>)
              }
            </div>

        </div>
        </>
    );
}

export default Landlord;