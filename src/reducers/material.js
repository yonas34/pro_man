const material=(state=[],action)=>{

    switch(action.type)
    {
    case "SET_MATERIAL":
        {state=action.data
            console.log(action)
        return state;}
    case "CLEAR_MATERIAL":
        state={data:""}
        return state;
     default:
         return state;   
    
    }
    
    }
    export default material;