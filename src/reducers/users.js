const users=(state=[],action)=>{

    switch(action.type)
    {
    case "SET_USERS":
        {state=action.data
            console.log(action)
        return state;}
    case "CLEAR_USERS":
        state={data:""}
        return state;
     default:
         return state;   
    
    }
    
    }
    export default users;