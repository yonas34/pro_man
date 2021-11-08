import {Dashboard,Task,Person,Logout,CarRepair,Add,ViewList} from '@mui/icons-material'

export const MenuList=[
{
icon:<Dashboard/>,
link:'/',
name:"Dashboard"
},
{
    icon:<Task/>,
    link:'/projects',
    name:'Project'
},

{
icon:<Person/>,
link:'/user',
name:"User Management"


},
{
    icon:<Add/>,
    link:'/add_resource_type',
    name:"Add Resources Type"

    
},
{

icon:<ViewList/>,
link:'/view_resource_type',
name:"View Resource Type"

}


]
export const MenuSession=[

    {

name:"Logout",
icon:<Logout/>,
to:"/login"

    }
]