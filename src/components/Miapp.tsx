import React, { useEffect, useState } from 'react'

interface Props {
    
}

const headers = {
    'Content-Type': 'application/json'
}

const Miapp = (props: Props) => {
    const [cuenta, setCuenta] = useState({
        username:"",
        password:""
    })
    const {username, password} = cuenta;

    useEffect(() => {
    }, [])
    
    const handleInputChange = (e:any) => {
        setCuenta({
            ... cuenta,
            [e.target.name]:e.target.value
        })
        // console.log(e.target.value)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        (async()=>{
            const resp = await fetch('http://localhost:3000/login',{
            headers,
            method: 'POST',
            body:JSON.stringify({username, password})
            })
            if(!resp.ok){
                alert('Error autentic f');
            }
            const data = await resp.json();
            console.log(data)
        })()

    }
    return (
        <div>
            <form 
                action=""
                onSubmit={handleSubmit}
            >
                <label htmlFor="username">Username</label>
                <input 
                        className='form-control'
                        type="text" 
                        name='username'
                        onChange={handleInputChange} 
                        autoComplete="false"
                        value={username}
                />
                <label htmlFor="password">Password</label>
                <input 
                        className='form-control'
                        type="password" 
                        name='password'
                        onChange={handleInputChange} 
                        autoComplete="false"
                        value={password}
                />
                <button 
                        className="btn btn-primary" 
                        type="submit"
                        
                        >
                            Iniciar Sesión
                </button>
            </form>
        </div>
    )
}
export default Miapp