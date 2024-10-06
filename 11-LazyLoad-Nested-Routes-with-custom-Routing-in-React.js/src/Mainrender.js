
import React from 'react'
import {Suspense} from "react"
const Cards = React.lazy(() => import('./components/Cards'));
const Accounts = React.lazy(() => import('./components/Accounts'));

function Mainrender(props) {
    

        if (props.state===1){
            return(
                <Suspense fallback={<div>I am loading</div>}>
                <Accounts/>
                </Suspense>
            )
        }

        else if (props.state===2){
            return(
                <Suspense fallback={<div>I am loading</div>}>
                <Cards/>
                </Suspense>
            )
        }

        else{

        }
     
}

export default Mainrender;