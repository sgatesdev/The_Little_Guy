import React from 'react';
import StoreProvider from '../store';

const App = () => {
  return (
    <StoreProvider>
      <div>
        <h1>Project 3!</h1>
      </div>
    </StoreProvider>
  );
}

export default App;
