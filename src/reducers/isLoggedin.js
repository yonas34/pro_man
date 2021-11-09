const isLoggedin=(state=true,actions)=>{
switch(actions.type)
{
case "TOGGLE":
    return !state;  
 default:
    return state;
}
}
export default isLoggedin;