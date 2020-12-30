import React, { useContext , useEffect } from 'react'
import { Route , Redirect } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'


//recibe un componente y una copia de props
const Private = ({ component: Component, ...props } ) => {
    
    const authcontext = useContext( AuthContext );
    const { autenticado, usuarioAutenticado, cargando } = authcontext;

    useEffect(()=>{ 
        usuarioAutenticado()
        //eslint-disable-next-line
    },[])


    //si esta autenticado redirije al componente que cae por props, sino al componente inicial
    return (
        <Route { ...props } render={ props => !autenticado && !cargando ? ( <Redirect to="/"/> ) : ( <Component {...props}/> ) } />
    )
}
//exportar al app
export default Private
