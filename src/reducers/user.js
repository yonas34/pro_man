const user=(state={username:"",token:"",userId:"",usertype:""},action)=>{

switch(action.type)
{
case "SET_USER":
    state={username:action.data.username,token:action.data.token,userId:action.data.userId,reset:action.data.reset,usertype:action.data.usertype,resp:action.data.resp}
    return state;
case "CLEAR_USER":
    state={username:"",token:"",userId:"",usertype:"",resp:""}
    return state;
 default:
     return state;   

}

}
export default user;