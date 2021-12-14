import {GroupWork,Report,Dashboard,Store,Person,Add,ViewList,PeopleSharp, Gavel, Pages, Storage, Keyboard, Settings} from '@material-ui/icons'
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
            icon:<Report/>,
            link:'/quantityadmin',
            name:'Reports from Quantity Survoyer'
        }
        ,
        {

            name:"Settings",
            icon:<Settings/>,
            link:"/settings"
            
                },
    

])
case "2":
    return([{
        icon:<Task/>,
        link:'/projects',
        name:'Project'
    }, {

        name:"Settings",
        icon:<Settings/>,
        link:"/settings"
        
            },])
case "3":
    const list=[];
    const flag={"1":false,"3":false,"6":false};
    user.resp.map(re=>{
        console.log(re.special_user_id);
        switch(Number(re.special_user_id))
        {

case 1:
    console.log(re.special_user_id);
    if(!flag[1]){
    list.push( {
        icon:<Pages/>,
        link:'/',
        name:'Quantity Surveryor Page'
    })
    flag[1]=true;
}
    break;
 case 3:
     if(!flag[3]){
list.push( {
    icon:<Storage/>,
    link:'/store',
    name:'Store'
});
flag[3]=true}
break;

case 6:
    if(!flag[6]){
    list.push( {
        icon:<Keyboard/>,
        link:'/secretary',
        name:'SECRETARY'
    })
    flag[6]=true;
        
}}});

        list.push(  {

            name:"Settings",
            icon:<Settings/>,
            link:"/settings"
            
                })

return list;



}
}




export const MenuSession=[
    {

name:"Logout",
icon:<Logout/>,
to:"/login"

    },
   
]