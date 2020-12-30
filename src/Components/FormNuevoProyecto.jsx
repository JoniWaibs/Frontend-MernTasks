import React , { Fragment, useState, useContext } from 'react'
import ProyectoContext from '../Context/ProyectoContext'


const FormNuevoProyecto = () => {
    //state del formulario + destructuring para extraer todas las funciones y demas
    const proyectosContext = useContext( ProyectoContext );
    const { formulario , mostrarForm , cargarProyectoNuevo , mostrarAlerta, alerta } = proyectosContext;
    //modificar el state para que se muestre el formulario cuando se clickea el boton
    const showFormProyect = () => { mostrarForm() };
    //state del componente + destructuring
    const [ newProject , setNewProject ] = useState({ nombre:"" , id:""});
    const { nombre } = newProject;
    //completar el state
    const inputData = e => setNewProject({...newProject , [e.target.name]:e.target.value });
    //cargar el proyecto
    const submitNewProject = e => {
        newProject.id = Date.now()
        e.preventDefault();
        //validar campo
        if( nombre.trim() === "" ){
            //alerta
            mostrarAlerta('Debes agregar un nombre a tu proyecto')
            return;
        };
        //enviar al state genera para cargar nuevo proyecto
        cargarProyectoNuevo(newProject)
        //reset form
        setNewProject({ nombre:"",});
    };
    

    return (
        <Fragment>
            <button type="button" className="btn btn-primario btn-block" onClick={showFormProyect} >New Project</button>
            { formulario 
                ?
                    <form onSubmit={submitNewProject} className="formulario-nuevo-proyecto">
                        <input 
                            type="text" 
                            className="input-text"
                            name="nombre" 
                            id="nombre"
                            value={nombre}    
                            placeholder="Ej: Tienda Online"
                            onChange={inputData}
                        />
                        <button type="submit" className="btn btn-primario btn-block">Agregar</button>
                        { alerta ? <p className="mensaje error">{alerta}</p> : null}
                    </form>
                :
                    null
            }
        </Fragment>
    )
}

export default FormNuevoProyecto
