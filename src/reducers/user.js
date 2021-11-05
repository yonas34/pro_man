const user=(state={username:"",token:"",userId:"",usertype:""},action)=>{

switch(action.type)
{
case "SET_USER":
    state={username:action.data.username,token:action.data.token,userId:action.data.userId,usertype:action.data.usertype}
    return state;
case "CLEAR_USER":
    state={username:"",token:"",userId:"",usertype:"",}
    return state;
 default:
     return state;   

}

}
export default user;