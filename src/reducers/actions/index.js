export const setUser=(data)=>{


    return {

        type:"SET_USER",
        data:{username:data.username,usertype:data.usertype,userId:data.userId,token:data.token,resp:data.resp}
    }
}
export const setUsers=(data)=>{

console.log(data);
    return {

        type:"SET_USERS",
        data:data,
        
    }
}

export const setMaterial=(data)=>{

    console.log(data);
        return {
    
            type:"SET_MATERIAL",
            data:data,
            
        }
    }
    export const clearMaterial=()=>{

        return {
            type:"CLEAR_Material"
        }
    }
export const clearUser=()=>{

    return {
        type:"CLEAR_USER"
    }
}

export const loginToggle=()=>{

    return {
        type:"TOGGLE"
    }
}