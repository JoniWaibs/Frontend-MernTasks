import React, { Fragment , useContext } from "react";
import Tarea from "./Tarea";
import ProyectoContext from '../../Context/ProyectoContext'
import TareasContext from '../../Context/TareasContext'


const ListadoTareas = () => {
  //state inicial + destructuring para traer los datos de cada proyecto y funciones
  const proyectosContext = useContext( ProyectoContext );
  const { proyecto , eliminarProyecto } = proyectosContext;
  //state inicial de tareas para mostrarrlas en el listado
  const tareasContext = useContext( TareasContext )
  const { tareasProyecto, activarTareas } = tareasContext;

  //si no hay proyecto seleccionado ( inicio de la app) rebota
  if(!proyecto) return <h2>Seleccioná un proyecto.</h2>
  //extraigo el objeto dentro del array
  const [objProyecto] = proyecto
  //eliminar poryecto x id
  const capturarId = id => { eliminarProyecto(id) }
  //actualizar vista de tareas de un proyecto desdpues de eliminar
  const actualizarTareas = () =>{ activarTareas( objProyecto._id ) }

  return (
    <Fragment>
        <h2>Proyecto: <span>{objProyecto.nombre}</span></h2>
        <ul className="listado-tareas">
            { tareasProyecto.length === 0 
            ? 
              (<li className="tarea"><p>No hay nada para mostrar</p></li>)
            :
              tareasProyecto.map((tarea) => (<Tarea key={tarea._id}  tarea={tarea} actualizarTareas={actualizarTareas} objProyecto={objProyecto}/>))
            }
        </ul>
        <button type="button" className="btn btn-eliminar" onClick={ ()=> capturarId( objProyecto._id )}>Eliminar Proyecto &times;</button>
    </Fragment>
  );
};

export default ListadoTareas;
