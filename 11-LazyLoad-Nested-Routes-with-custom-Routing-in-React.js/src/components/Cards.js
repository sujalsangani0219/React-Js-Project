import {useState} from 'react'
import React from 'react'
import { Suspense } from 'react';
import Render1 from './Render1';

function Cards() {

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
        <button onClick={myfun1}>Debt</button>
        <button onClick={myfun2}>Visa</button>
        <button onClick={myfun3}>Master</button>

        <Render1 state = {state}/>


        
        </div>
     );
}

export default Cards;