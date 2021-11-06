import React from 'react'
import {CDBNavbar,CDBNavBrand} from 'cdbreact'
import logo from '../resources/logo.JPG'
function Navbar() {
    return (
      
        <CDBNavbar style={{width:"100%", backgroundColor: "#000000", color: "#f4f4f4" }}>
        <CDBNavBrand>
        
        <img class="avatar avatar-16 img-circle" style={{height:"40px"}}src={logo}/>
        
        Project management
        
        </CDBNavBrand>
        
                    </CDBNavbar>
        
    )
}

export default Navbar
