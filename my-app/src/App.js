import React from 'react';
import ReactDom from "react-dom";
import logo from './logo.svg';
import './App.css';
import FormikPersonForm from './components/Form';

function App() {
  return (
    <div className="App">
        New Member Sign Up!
        <FormikPersonForm/>
    </div>
  );
}

export default App;
