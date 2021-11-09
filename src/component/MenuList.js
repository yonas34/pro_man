import {Dashboard,Person,CarRepair,Add,ViewList} from '@material-ui/icons'
import { ExitToApp as Logout } from '@material-ui/icons'
import { Work as Task } from '@material-ui/icons'
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
    link:'/view_resource_type',
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