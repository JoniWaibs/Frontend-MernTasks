import React , { useContext } from 'react'
import TareasContext from '../../Context/TareasContext'



const Tarea = ({tarea, actualizarTareas, objProyecto}) => {

    //state de tareas y funcion eliminar
    const tareasContext = useContext( TareasContext );
    const { eliminarTarea , editarTarea , conseguirTarea} = tareasContext;
    //capturar el id de la tarea
    const eliminar = id =>{
        // enviarlo para borrar
        eliminarTarea( id , objProyecto._id )
        //actualizar tareas
        actualizarTareas()
    };
    //modificar el estado de cada tarea
    const nuevoEstado = () =>{ 

        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }

        //actualizar las tareas
        editarTarea( tarea )

    }
    //seleccionar tarea para editar
    const editar = tarea =>{ conseguirTarea(tarea) }
   
    
    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                { tarea.estado 
                ?
                    <button type="button" className="completo" onClick={ nuevoEstado }>Completo</button>
                :
                    <button type="button" className="incompleto" onClick={  nuevoEstado }>incompleto</button>
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => editar( tarea )}>Editar</button>
                <button type="button" className="btn btn-secundario" onClick={() => eliminar(tarea._id)}>Eliminar</button>
            </div>    
        </li>
    )
}

export default Tarea
