import Current from "./Current";
import Saving from "./Saving";
import Nisa from "./Nisa";
import Accountsmain from "./Accountsmain";


function Render1(props) {


    if (props.state ===0){
        return <Accountsmain/>
    }

   else if (props.state ===1){
        return <Current/>
    }

    else if (props.state ===2){
        return <Saving/>
    }

    else if (props.state ===3){
        return <Nisa/>
    }

    else{

    }
    
}

export default Render1;