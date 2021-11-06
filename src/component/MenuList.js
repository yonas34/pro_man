import {Dashboard,Task,Person,Logout} from '@mui/icons-material'

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


}


]
export const MenuSession=[

    {

name:"Logout",
icon:<Logout/>,


    }
]