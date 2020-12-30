import React from 'react'
import FormNuevoProyecto from '../Components/FormNuevoProyecto'
import ListadoProyectos from '../Components/ListadoProyectos'

const Sidebar = () => {
    return (
       <aside>
           <h1>DEVS<span>Backoffice</span></h1>

           <FormNuevoProyecto/>
           
           <div className="proyectos">
               <h2>Tus Proyectos:</h2>

                <ListadoProyectos />

            </div>
       </aside>
    )
}

export default Sidebar
