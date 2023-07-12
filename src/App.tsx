import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BingoBoard } from './components';

function App() {
  return (
    <div className="container">
      <div className="title">
        <h1 style={{ margin: 0 }}>Candi Bingo</h1>
      </div>
      <BingoBoard />
    </div>
  );
}

export default App;
