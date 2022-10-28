import React, { useEffect, useState } from 'react'


const url = `https://rickandmortyapi.com/api/character`;
const BodyRickAndMorty = () => {
    const [id, setId] = useState(1)
    const [data,setData] = useState()
    const [booleanuso, setBooleanuso] = useState(false)
    const [classBooleanuso, setClassBooleanuso] = useState({
        true:"btn-success",
        false:"btn-danger"
    })
    const incrementId = () => {
        setId(id + 1)
    }
    const decrementId = () => {
        setId(id - 1)
    }
    useEffect(() => {
        fetch(`${url}/${id}`)
        .then(resp => resp.json())
        .then(characters => setData(characters))
    }, [id])
    return (
        <>
            <h1>Rickardo & Marcelo</h1>
            <hr />
            {/* {JSON.stringify(data, null, 3)} */}
            <p>{data?.['name']}</p>
            <p>{data?.['gender']}</p>
            <p>{data?.['species']}</p>
            <img src={data?.['image']} alt={`$data?.['name']Img`} />
            <hr />
            <p>{id}</p>
            <button 
                className="btn btn-danger mx-2 my-2" 
                onClick={()=>{decrementId}}>
                    -1
            </button>
            <button 
                className="btn btn-success mx-2 my-2" 
                onClick={()=>{incrementId}}>
                    +1
            </button>
            <button 
                className={`btn mx-2 my-2 ${classBooleanuso[`${booleanuso}`]}`} 
                onClick={()=>{setBooleanuso(!booleanuso)}}>
                    {`${booleanuso}`}
            </button>
        </>
    )
}

export default BodyRickAndMorty;
