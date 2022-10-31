import { getToken } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import './authCSS.css'
interface Props {

}

const headers = {
    'Content-Type': 'application/json'
}

const Miapp = (props: Props) => {
    const [cuenta, setCuenta] = useState({
        username: "",
        password: ""
    })
    const [islogged,setIsLogged] = useState(false)
    
    const { username, password } = cuenta;
    const [errortip, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, [])

    const handleInputChange = (e: any) => {
        setCuenta({
            ...cuenta,
            [e.target.name]: e.target.value
        })
        // console.log(e.target.value)
    }
    
    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            try {
                setLoading(true)
                const resp = await fetch('http://localhost:3000/login', {
                    headers,
                    method: 'POST',
                    body: JSON.stringify({ username, password })
                })
                if (!resp.ok) {
                    const errorcito = await resp.json();
                    setError(errorcito.message)
                    setLoading(false)
                    setTimeout(() => {
                        setError("")
                    }, 2000)
                }
                setTimeout(() => {
                    setError("")
                    setLoading(false)
                }, 3000)
                const data = await resp?.json();
                localStorage.setItem('login', data.token)
                setIsLogged(true)
                console.log(localStorage.getItem('login'))
            } catch (error) {
                return ('no se pudo conectar con el servidor');
            }
        })()

    }

    const [usuarios,setUsuarios] = useState<any>([]);

    const hacerFetch = () => {
        (async ()=>{
            try {
                var myHeaders = new Headers();
                const token = localStorage.getItem('login')
                myHeaders.append("Authorization", token ?? "");

                const requestOptions:object = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const respuestaSV = await fetch("http://localhost:3000/users", requestOptions)
                const objectResp = await respuestaSV.json()
                setUsuarios(objectResp);
            } catch (error) {
                console.log(error);
                setIsLogged(false)
            }
        })()

    }
    
    return (
        <div className='container'>
            {!islogged && <>
                <form
                action=""
                id='authForm'
                className='border border-4 border-secondary p-4 rounded mx-auto text-center'
                onSubmit={handleSubmit}
            >
                <label className='fw-bold'
                    htmlFor="username">Username</label>
                {loading && <div className="text-center my-2">
                    <div className="spinner-border" role="status">
                    </div>
                </div>}

                <input
                    className='form-control border my-2'
                    type="text"
                    name='username'
                    onChange={handleInputChange}
                    autoComplete="false"
                    value={username}
                />
                <label className='fw-bold'
                    htmlFor="password">Password</label>
                <input
                    className='form-control border my-2'
                    type="password"
                    name='password'
                    onChange={handleInputChange}
                    autoComplete="false"
                    value={password}
                />
                <div className="d-grid mt-2">
                    <button
                        className="my-2 btn btn-primary"
                        type="submit"

                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
            <div className="text-center">
            <label className='' htmlFor="error">{errortip}</label>
            </div>
            </>}


            <div className="my-5 border border-secondary border-4 p-4 rounded">
                <div className="d-grid">
                    <button className="btn btn-primary"
                        onClick={hacerFetch}>
                        getUsers
                    </button>
                </div>
                <div className="my-3">
                    {/* { `${JSON.stringify(usuarios)}` } */}
                    {/* {JSON.stringify(usuarios["users"])}
                    {JSON.stringify()}
                    {usuarios['users']?.['username']} */}
                    <ul className=''>
                    {usuarios?.users?.map((user:any,id:number)=>{
                        return <div key={id}>
                            <li> {user?.username}</li>
                            <ul> <li>{user?.email}</li></ul>
                        </div>
                    })}
                        
                    </ul>

                </div>
            </div>
        </div>
    )
}
export default Miapp