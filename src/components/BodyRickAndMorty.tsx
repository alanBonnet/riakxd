import React, { useEffect, useState } from 'react'


const url = `https://rickandmortyapi.com/api/character`;
const BodyRickAndMorty = () => {
    const [id, setId] = useState(1)
    const [data,setData] = useState()
    const [mensaje,setMensaje] = useState("")
    useEffect(() => {
        fetch(`${url}/${id}`)
        .then(resp => resp.json())
        .then(characters => setData(characters))
    }, [id])
    const handleInputChange = (e:any) => {
        const dato = e.target.value;
        if(e.key == "Enter"){
            if(dato>=1 && dato<827){
                setId(parseInt(dato))
                // console.log(e.target.value)
                // console.log(e)
            }else{
                setMensaje("Fuera de rango: solo hay 826 personajes registrados")
                // setTimeout(()=>{
                //     setMensaje("")
                // },6000)
            }
        }

    }
    return (
        <>
            <h1>Rick & Morty</h1>
            <hr />
            {/* {JSON.stringify(data, null, 3)} */}
            <p>{data?.['name']}</p>
            <button 
                className="btn btn-danger mx-2" 
                onClick={()=>{if(id >1){setId(id-1)}}}>
                    -1
            </button>
            <button 
                className="btn btn-success mx-2" 
                onClick={()=>{if(id<827){setId(id+1)}}}>
                    +1
            </button>
            <input className='p-1 rounded' type="number" value={id} disabled/>
            <input className='p-1 rounded' type="number" onKeyUp={handleInputChange} />
            <hr />
            {mensaje.trim() && <p className='bg-danger text-white p-3 font-weight-bold rounded'>{mensaje}</p>}

        </>
    )
}

export default BodyRickAndMorty;