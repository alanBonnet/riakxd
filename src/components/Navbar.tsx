import React, { useState } from "react"
interface Props {
    username: string,
    colorPref: string
}
interface Colors {
    [color: string]: {
        [textOrBackGroundColor: string]: string
    }
}
const Navbar: React.FC<Props> = ({ username, colorPref }) => {
    // const [text, setText] = useState("Home");
    // const [cito,setColor] = useState("success");
    // const changeButton = () => {
    //         if(text=="Home"){
    //             setColor("Red");
    //             console.log("Macaco debería")
    //             setText("Maaaacaco");
    //         }else{
    //             setText("Home");
    //             console.log("Home debería");
    //             setColor("Red");
    //         }


    // }
    const colors: Colors = {
        Red: {
            color: "text-danger",
            background: "bg-white"
        },
        Blue: {
            color: "text-primary",
            background: "bg-white"
        },
        Green: {
            color: "text-success",
            background: "bg-white"
        },
        Yellow: {
            color: "text-warning",
            background: "bg-white"
        },
        Black: {
            color: "text-dark",
            background: "bg-white"
        },
        White: {
            color: "text-white",

        }
    }
    // const colorsBtn: Colors = {
    //     Red: "btn-danger",
    //     Blue: "btn-primary",
    //     Green: "btn-success",
    //     Yellow: "btn-warning"
    // }
    const outputColor = `${colors[colorPref]?.["color"]} ${colors[colorPref]?.["background"] ?? ""}`
    let classBrand = `navbar-brand p-2 rounded ${outputColor ?? ""} `
    if (username.trim()) {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a href="" className={classBrand}>{username}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto mb-2 mb-md-0">
                            {/* <li className="nav-item active">
                            <a className={`nav-link ${colors[cito]} ${colorsBtn[cito]}`} onClick={changeButton} aria-current="page" href="#">{text}</a>
                        </li> */}
                            <li className="nav-item">
                                <a className="nav-link">Convertidor</a>
                            </li>

                        </ul>
                        {/* <form className="d-flex">
                        <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    </div>
                </div>
            </nav>
        )
    } else {
        username = "NombreEjemplo"; classBrand = "navbar-brand"
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a href="" className={classBrand}>{username}</a>
                </div>
            </nav>
        )
    }
}

export default Navbar

