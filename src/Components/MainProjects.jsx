import React, { useEffect , useContext }  from 'react'
import NavBar from '../Layout/NavBar'
import Sidebar from '../Layout/Sidebar'
import ListadoTareas from '../Components/Tasks/ListadoTareas'
import FormularioTareas from '../Components/Tasks/FormularioTareas'
import AuthContext from '../Context/AuthContext'



const MainProjects = () => {
    //context de auth para obtener el usuario al iniciark el app, si es que esta logeado
    const authcontext = useContext( AuthContext )
    const { usuarioAutenticado } = authcontext;
    useEffect(()=>{ 
        usuarioAutenticado()
        //eslint-disable-next-line
    },[])



    return (
        <div className="contenedor-app">
            
            <Sidebar/>
            
            <div className="seccion-principal">

                <NavBar/>

                <main>

                    <FormularioTareas/>

                    <div className="contenedor-tareas">

                        <ListadoTareas/>    

                    </div>

                </main>
            </div>    
            
        </div>
    )
}

export default MainProjects
