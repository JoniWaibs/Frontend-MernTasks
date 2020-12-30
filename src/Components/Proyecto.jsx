import React ,{ useContext } from 'react'
import ProyectoContext from "../Context/ProyectoContext";
import TareasContext from '../Context/TareasContext'

const Proyecto = ({proyecto}) => {

    //state inicial + destructuing para obtener la funcion que activa el proy 
    const proyectosContext = useContext( ProyectoContext );
    const { activarProyecto } = proyectosContext;
    //state inicial de tareas con su funcion para activarlas en base a cada proyecto
    const tareasContext = useContext( TareasContext )
    const { activarTareas } = tareasContext;
    //evia el id del proyecto seleccionado para ser cruzado con la ddbb
    const verProyecto = idProy =>{ 
        activarProyecto( idProy ) //filtra el proyecto 
        activarTareas( idProy ) // filtra sus tareas
    };

    return (
        <li>
            <button type="button" className="btn btn-blank" onClick={() => verProyecto(proyecto._id)}>{proyecto.nombre}</button>
        </li>
    )
}

export default Proyecto
