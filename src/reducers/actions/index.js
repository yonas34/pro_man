export const setUser=(data)=>{


    return {

        type:"SET_USER",
        data:{username:data.data.user_name,usertype:data.data.user_type_id,userId:data.data.emp_id,token:data.jwt}
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