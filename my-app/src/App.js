import React from 'react';
import Competition from './Competition';
import { fakeCompetition } from './Data'
import './App.css';

function App() {
  return (
    <div className="App">
      <Competition {...fakeCompetition}/>
    </div>
  );
}

export default App;
