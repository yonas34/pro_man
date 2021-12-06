import {GroupWork,Dashboard,Store,Person,Add,ViewList,PeopleSharp, Gavel, Pages, Storage, Keyboard, Settings} from '@material-ui/icons'
import { ExitToApp as Logout } from '@material-ui/icons'
import { Work as Task } from '@material-ui/icons'
import {useSelector} from 'react-redux'

export const MenuList=()=>{
    
    const user =useSelector(state=>state.user);

 switch(user.usertype)
 {
     case "1":  
    return([

{
    icon:<Task/>,
    link:'/projects',
    name:'Project'
},
{
    icon:<Pages/>,
    link:'/activities',
    name:'Activity'
},

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

    {

        icon:<Gavel/>,
        link:'/material',
        name:"Material"
        
        },
        {

            name:"Settings",
            icon:<Settings/>,
            link:"/settings"
            
                },
    

])
case "3":
    return([

        {
            icon:<Pages/>,
            link:'/',
            name:'Quantity Surveryor Page'
        },
        {
            icon:<Storage/>,
            link:'/store',
            name:'Store'
        },
        {
            icon:<Keyboard/>,
            link:'/secretary',
            name:'SECRETARY'
        },
        {

            name:"Settings",
            icon:<Settings/>,
            link:"/settings"
            
                },
    

    ])



}
}




export const MenuSession=[
    {

name:"Logout",
icon:<Logout/>,
to:"/login"

    },
   
]