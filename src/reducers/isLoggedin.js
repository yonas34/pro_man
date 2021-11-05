const isLoggedin=(state=false,actions)=>{
switch(actions.type)
{
case "TOGGLE":
    return !state;  
 default:
    return state;
}
}
export default isLoggedin;