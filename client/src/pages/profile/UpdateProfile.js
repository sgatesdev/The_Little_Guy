import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../apollo-client/mutations';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../config/history';

const Update = () => {
const dispatch = useDispatch();
const user = useSelector((state) => state.user);
const [updateUser, { error }] = useMutation(UPDATE_USER);
const [fileInputState, setFileInputState] = useState('');
const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    image: '',
});
const handleInput = (e) => {
  let { name, value } = e.target;

  setFormState({
      ...formState, 
      [name]: value
  })};
  const [displayError, setDisplayError] = useState(null);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    let { name, value } = event.target;
    console.log(file)
    setFormState({
        ...formState, 
        [name]: value
    })

    const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result)
        reader.onload = () => {
            setFileInputState( reader.result);
        }

}
useEffect(() => {
    if(user) {
    setFormState({firstName: user.firstName, lastName: user.lastName, bio: user.bio})
    setFileInputState(user.image)
    }
},[user])

    const handleForm = async (e) => {
        e.preventDefault();
        setDisplayError(null);

        // destructure state
        const {
            firstName,
            lastName,
            bio,
            image
        } = formState;

        console.log(fileInputState)
      try {
        const userData = await updateUser({
            variables: {
                firstName: firstName,
                lastName: lastName,
                bio:bio,
                image: fileInputState? fileInputState : user.image
            }
        }); console.log(userData)
        const reduxData = { ...userData.data.updateUser.user };
        dispatch({
          type: 'UPDATE_USER',
          payload: { ...reduxData }
                  });
          }
          catch(err) {
              return setDisplayError(`${err}`);
          }
          history.push('/');
        };

    return(
            // This form will update: Bio, Email, and picture 
        
      <>
        <div className="min-h-screen flex  justify-center py-20 bg-CPgray py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6 ">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" onSubmit={handleForm}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          autoComplete="given-name"
                          value={formState.firstName}
                          onChange={handleInput}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          autoComplete="family-name"
                          value={formState.lastName}
                          onChange={handleInput}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Help others get to know you"
                          defaultValue={''}
                          value={formState.bio}
                          onChange={handleInput}
                        />
                      </div>
                    
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile photo</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="image" type="file" className="sr-only"  onChange={handleFileUpload} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    
          
      </>
    )
  }
  


export default Update;
