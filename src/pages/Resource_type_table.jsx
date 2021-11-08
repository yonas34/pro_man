import React, { useEffect,useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';


function Resource_type_table() {
    const user = useSelector(state => state.user)

    const [data,setData]=useState([]);
    useEffect(() => {
        
  axios.post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php",{jwt:user.token}).then((response)=>{


setData(response.data.data)

  });
  console.log(data);
    }, [])
    return (
        <div>
          hello
        </div>
    )
}

export default Resource_type_table
