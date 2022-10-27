import React, { useEffect, useState } from 'react'


const url = `https://rickandmortyapi.com/api/character`;
const BodyRickAndMorty = () => {
    const [id, setId] = useState(1)
    const [data,setData] = useState()
    useEffect(() => {
        fetch(`${url}/${id}`)
        .then(resp => resp.json())
        .then(characters => setData(characters))
    }, [id])
    return (
        <>
            <h1>Rick & Morty</h1>
            <hr />
            {/* {JSON.stringify(data, null, 3)} */}
            <p>{data?.['name']}</p>
            <button 
                className="btn btn-dark" 
                onClick={()=>{setId(id+1)}}>
                    +1
            </button>
        </>
    )
}

export default BodyRickAndMorty;