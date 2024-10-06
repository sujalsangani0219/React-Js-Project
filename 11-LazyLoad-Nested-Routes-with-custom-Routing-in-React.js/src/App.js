import logo from './logo.svg';
import React from 'react'
import './App.css';
import {useState, useEffect} from 'react'
import Mainrender from './Mainrender';
import {useRef} from 'react'


function App() {
const [state, setstate] = useState(0)

function myfun(){

  setstate(1)

}

function myfun1(){

  setstate(2)
}
  
  return (
    <div>
    <button  onClick={myfun}>Accounts</button>

    <button onClick={myfun1}>Cards</button>
<Mainrender state={state}/>
    </div>
  );
}

export default App;
