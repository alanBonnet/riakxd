import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Table_Conversions from './components/Table_Conversions';
import BodyRickAndMorty from './components/BodyRickAndMorty';
import Miapp from './components/Miapp';
import Lifecycle from './components/Lifecycle';
const dataDB = {
    username: " Alancito ",
    prefColor: "White"
}

function App() {
    const [count, setCount] = useState(0);

    const { username, prefColor } = dataDB

    return (
        <>
            <header className='mb-5'>
                <Navbar username={username} colorPref={prefColor} />
            </header>
            {/* <Table_Conversions bootstrapClass="my-5 bg-primary rounded p-3" text_color="white"/> */}
            {/* <BodyRickAndMorty /> */}
            {/* <Lifecycle /> */}
            <Miapp/>
        </>
    )
}


export default App
