import React from 'react';
import VisibleUsers from '../../Containers/VisibleUsers'
import HeaderHandler from '../../Containers/HeaderHandler'
import './App.css';

function App() {
  return (
    <div>
        <HeaderHandler />
        <VisibleUsers />
    </div>
  );
}

export default App;
