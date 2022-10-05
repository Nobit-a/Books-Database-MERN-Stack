import React, {useEffect, useState} from "react";
import { json, useNavigate } from "react-router-dom";

const SignUp = () => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect (()=>{
        const auth = localStorage.getItem('user_data')

        if (auth){
            navigate('/')
        }
    })


    const collectData = async () => {

        let result = await fetch( // Sending the result obtained through form to Node.js backend
            'http://localhost:4500/signup', // Kaha bhejna hai
            {
                method:'POST', // Kaise bhejna hai
                body: JSON.stringify({name, email, password}), // Kya bhejna hai
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
        
        result = await result.json()
        // console.warn(result)
        localStorage.setItem('user_data', JSON.stringify(result))

        if(result){
            navigate('/')
        }
    }

    return (
        <div className="main-content">
            <h1>Register</h1>

            <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
            <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>


            <button className="submit-button" type="button" onClick={collectData}>Submit</button>

        </div>
    )

}

export default SignUp