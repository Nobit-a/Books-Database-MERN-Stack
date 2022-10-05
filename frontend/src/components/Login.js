import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect (()=>{
        const auth = localStorage.getItem('user_data')

        if (auth){
            navigate('/')
        }
    })

    
    const collectData = async () => {

        let result = await fetch(
            'http://localhost:4500/login',
            {
                method:'POST',
                body:JSON.stringify({email, password}),
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )

        result = await result.json()
        console.warn(result)

        if (result.name)
        {
            localStorage.setItem('user_data', JSON.stringify(result))
            navigate('/')
        }
        else
        {   
            alert(result.result)
        }

    }

    return (
        <div>
            <h1>Log In</h1>
            <input className="login" type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email'/>
            <input className="login" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password'/>
            <button className="submit-button" type='button' onClick={collectData}>Log In</button>

        </div>
    )

}

export default Login