export const setUser=(data)=>{


    return {

        type:"SET_USER",
        data:{username:data.username,usertype:data.usertype,userId:data.userId,token:data.token}
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