import React from 'react';
import ToDo from './components/ToDo';

const App = () => {
  return (
    <div className='app h-screen w-screen bg-stone-800 bg-cover bg-center flex justify-center items-center'>
      <ToDo />
    </div>
  );
};

export default App;
