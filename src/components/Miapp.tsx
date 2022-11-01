import { getToken } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import './authCSS.css'
import Navbar from './Navbar'
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
    const [errortip1, setError1] = useState("");
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
                        setLoading(false)
                    }, 2000)
                    return false
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
                if(!respuestaSV.ok){
                    const errorcito = await respuestaSV.json();
                    setError1(`${JSON.stringify(errorcito.msg) ?? ""}`)
                    setTimeout(() =>{
                        setError1("")
                        
                    },6000)
                    return false;
                }
                const objectResp = await respuestaSV.json()
                setUsuarios(objectResp);
            } catch (error) {
                // console.log(error);
                setIsLogged(false)
                
            }
        })()

    }
    
    return (
        <>
            <header className='mb-5'>
                <Navbar username={username ?? "Usuario"} colorPref={"White"} />
            </header>
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


                {islogged && <div className="my-5 border border-secondary border-4 p-4 rounded">
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
                        
                        {errortip1 && <div className='p-4 bg-danger rounded text-white text-center'>{errortip1}</div>}

                        <ul className=''>

                        {usuarios?.users?.map((user:any,id:number)=>{
                            return <div key={id} className="my-2">
                                <li className='fst-italic fw-bold'> {user?.username}</li>
                                <ul> <li className='fst-italic'>{user?.email}</li></ul>
                            </div>
                        })}
                            
                        </ul>

                    </div>
                </div>}
            </div>
        </>
    )
}
export default Miapp