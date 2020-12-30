import React , { useContext , useState, useEffect } from 'react'
import ProyectoContext from '../../Context/ProyectoContext'
import TareasContext from '../../Context/TareasContext'


const FormularioTareas = () => {
    //state de este componente 
    const [ newTarea , SetNewTarea ] = useState({id:"",  nombre: "", estado: false, proyectoId:"" });
    const { nombre } = newTarea;
    //state inicial + destructuring a un proyecto para activar el formulario de tareas
    const proyectoContext = useContext( ProyectoContext );
    const { proyecto } = proyectoContext;
    //state de tareas, con la funcion que carga nueva tarea
    const tareasContext = useContext( TareasContext ); 
    const{ cargarTarea , alerta , showAlerta , activarTareas , edicionTarea, editarTarea } = tareasContext;
    //useffect para chequear si hay una tarea seleccionada por editar
    useEffect(() => {
        //si llega una tarea el se llena el state y asu vez el form
        if( edicionTarea !== null ){
            SetNewTarea( edicionTarea )
        }else{
            SetNewTarea({ nombre:"" })
        }
    }, [ edicionTarea ])
    
    if( !proyecto ) return null; //si no hay proyecto seleccionado ( inicio de la app) rebota
   
    
    //accedo al objeto del proyecto para capturar su id
    const [objProyecto] = proyecto;
    //completar el state del componente
    const inputData = e =>{ SetNewTarea({ ...newTarea, [e.target.name]:e.target.value , proyectoId : objProyecto._id,})};
    //enviar los datos para crear una nueva tarea
    const sumitAgregarTarea = e =>{
        e.preventDefault();
        //validar
        if( nombre.trim() ==="" ){
            //alerta
            showAlerta()
            return;
        };
        //revisar si es edicion o es nueva tarea
        if( edicionTarea ){

            editarTarea(newTarea)//enviar tarea editada
        }else{
            cargarTarea( newTarea ) //enviar el nuevo objeto para almacenar como tarea  
        };
        //actualizar el listado de tareas
        activarTareas( objProyecto._id );
        //reset form
        SetNewTarea({ nombre: "" });
    };
 
    return (
        <div className="formulario">
            <form onSubmit={ sumitAgregarTarea }>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        value={nombre}
                        onChange={ inputData }
                    />
                </div>
                <div className="contenedor-input">
                    <button className="btn btn-primario btn-submit btn-block">{edicionTarea ? 'Editar Tarea' : 'Agregar Tarea' }</button>
                </div>
                { alerta ? <p className="mensaje error">Debes agregar un nombre a tu nueva tarea!</p>  : null }
            </form>
        </div>
    )
}

export default FormularioTareas
