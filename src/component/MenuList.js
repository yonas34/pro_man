import {GroupWork,Dashboard,Person,Add,ViewList,PeopleSharp} from '@material-ui/icons'
import { ExitToApp as Logout } from '@material-ui/icons'
import { Work as Task } from '@material-ui/icons'
export const MenuList=[
{
icon:<Dashboard/>,
link:'/',
name:"Dashboard"
},
// {
//     icon:<Task/>,
//     link:'/projects',
//     name:'Project'
// },

// {
// icon:<Person/>,
// link:'/user',
// name:"User Management"


// },
{
    icon:<Add/>,
    link:'/view_resource_type',
    name:"Resources Type"

    
},
{

icon:<ViewList/>,
link:'/resource',
name:"Resource"

},
{

icon:<PeopleSharp/>,
link:'/manpower',
name:"Manpower"

},

{

    icon:<GroupWork/>,
    link:'/employee',
    name:"Employee"
    
    },

]
export const MenuSession=[

    {

name:"Logout",
icon:<Logout/>,
to:"/login"

    }
]