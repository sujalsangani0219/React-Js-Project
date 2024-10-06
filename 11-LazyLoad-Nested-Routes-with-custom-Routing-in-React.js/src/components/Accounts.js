import {useState} from 'react'
import React from 'react'
import { Suspense } from 'react';
import Render1 from './Render1';

function Accounts() {

    const [state, setstate]= useState(0)

    function myfun1(){

        setstate(1)
    }

    function myfun2(){

        setstate(2)
    }

    function myfun3(){

        setstate(3)
    }
    return ( 

<div>
        <button onClick={myfun1}>Current</button>
        <button onClick={myfun2}>Saving</button>
        <button onClick={myfun3}>Nisa</button>

        <Render1 state = {state}/>
        </div>
     );
}

export default Accounts;