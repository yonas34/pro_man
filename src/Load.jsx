import React from 'react'
import {usePromiseTracker} from 'react-promise-tracker'
import Loader from 'react-loader-spinner';
function Load(props) {
    const {promiseInProgress}=usePromiseTracker();
    return (
           promiseInProgress && 
        <div style={{  position: 'absolute',
       marginLeft:"50%",
       marginBottom:"-200px",
        alignItems: 'center',
        top:"90%",
        justifyContent: 'center',zIndex:"1"}}>
        <Loader style={{  flex: 1,
    alignSelf:'center'}}  type={"ThreeDots"} color={"#1976d2"} height={"100"} width={"100"}/>
        </div>
    )
}

export default Load
