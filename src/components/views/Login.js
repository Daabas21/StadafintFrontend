import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'

const setToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime);
}

// const deleteToken = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("lasLoginTime");
// }

const Login = () => {

    const[input, setInput] = useState({email: "", password: ""})

    const handleChange = (e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = async () => {

        const res = await fetch('http://localhost:8080/auth/login',{
                method:"POST",
                body: JSON.stringify(input),
                headers:{
                    'Content-Type': 'application/json'
                }}
                
            )
         const data = await res.json()
         const token = data.token

         setToken(token);
    }
    

  return (
    <div>
        <Stack spacing={2} alignItems="center">
            <TextField
                id='email'
                label="email"
                variant='standard'
                value={input.email}
                name='email'
                onChange={handleChange}
            />
            <TextField
                id='password'
                label='password'
                variant='standard'
                value={input.password}
                name= 'password'
                onChange={handleChange}
            />
            <Button
                variant='contained'
                color='success'
                onClick={handleLogin}
            >LOGIN</Button>
        </Stack>
    </div>
  )
}

export default Login