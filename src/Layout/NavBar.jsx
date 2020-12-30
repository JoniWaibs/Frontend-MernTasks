import React, { useContext  } from 'react'
import AuthContext from '../Context/AuthContext'

const NavBar = (props) => {
    const authcontext = useContext( AuthContext )
    const { usuario , cerrarSesion } = authcontext;

    //cerrar sesion
    const handleLogout = () =>{ cerrarSesion() }


    return (
        <div>
            <header className="app-header">
                <p className="nombre-usuario">Hola, {usuario ?<span>{usuario.nombre}</span> : null } </p>
                <nav className="nav-principal">
                    <button className="btn btn-blank cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
                </nav>
            </header>
        </div>
    )
}

export default NavBar
