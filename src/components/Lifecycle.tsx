import React,{useEffect, useState} from 'react'
import getUser from '../helpers/getUser';
interface Props {

}
interface userInterface {
    [name: string]: string;

}

const initialUser :userInterface = {
    name:"Gabriel",
    email:"gabriel@gmail.com"
}
const Lifecycle = () => {
    const [user, setUser] = useState(initialUser)
    const [textito,setTextito] = useState('actualizar')


    const updateUser = () => {
        getUser().then((newUser)=>{
            setUser(newUser)
        })
    }
    useEffect(()=>{
        setTextito('actualizado')
        
    })
    return (
        <>
            <h1 className='bg-dark rounded p-3 m-5 text-white'>usuario: {`${user?.['name'] ?? ""}`}</h1>
            <h1 className='bg-dark rounded p-3 m-5 text-white'>email: {`${user?.['email'] ?? ""}`}</h1>
            <button 
                onClick={updateUser}
                className="btn btn-primary">
                    {textito}
                    
            </button>
        </>
    )
}

export default Lifecycle