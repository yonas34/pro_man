import React from 'react'
import {CDBSidebar,CDBSidebarContent,CDBSidebarFooter,CDBSidebarHeader,CDBSidebarMenu,CDBSidebarMenuItem} from "cdbreact";
import {NavLink} from 'react-router-dom'
import  {CDBNavbar,CDBContainer,CDBNavBrand} from 'cdbreact'
import logo from '../resources/logo.JPG';
export default function Sidebar() {
    return (
        <div >

            <CDBNavbar style={{ backgroundColor: "#000000", color: "#f4f4f4" }}>
<CDBNavBrand>

<img class="avatar avatar-16 img-circle" style={{height:"40px"}}src={logo}/>

Project management

</CDBNavBrand>

            </CDBNavbar>

        <div style={{ position:'absolute',display:'flex',height:'100vh',overflow:'scroll initial'}}>

<CDBSidebar textColor="#fff" backgroundColor="#333">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none"
        style={{color:'inherit'}}>''
        </a>
    </CDBSidebarHeader>
    
    <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/projects" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>




    <CDBSidebarFooter style={{textAlign:'center'}}>
<div className="sidebar-btn-wrapper"
style={{padding:"20px 5px"}}>
   NAYANZA ROAD WORKS p.L.C
</div>

    </CDBSidebarFooter>
    </CDBSidebar>            
        </div>
        </div>
    )
}
