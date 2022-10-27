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
    const [errortip,setError] = useState("");
    const [loading,setLoading] = useState(false);
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
            try {
                setLoading(true)
                const resp = await fetch('http://localhost:3000/login',{
                headers,
                method: 'POST',
                body:JSON.stringify({username, password})
                })
                if(!resp.ok){
                    const errorcito = await resp.json();
                    setError(errorcito.message)
                    setLoading(false)
                    setTimeout(()=>{
                        setError("")
                    },2000)
                }
                setTimeout(()=>{
                    setError("")
                    setLoading(false)
                },3000)
                const data = await resp?.json();
                localStorage.setItem('login',data.token)
                console.log(localStorage.getItem('login'))
            } catch (error) {
                return ('no se pudo conectar con el servidor');
            }
        })()

    }
    return (
        <div>
            <form 
                action=""
                onSubmit={handleSubmit}
            >
                <label htmlFor="username">Username</label>
                {loading &&<div className="text-center my-2">
                    <div className="spinner-border" role="status">
                    </div>
                </div>}
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
                        className="my-2 btn btn-primary" 
                        type="submit"
                        
                        >
                            Iniciar Sesión
                </button>
            </form>
                <label htmlFor="error">{errortip}</label>
        </div>
    )
}
export default Miapp