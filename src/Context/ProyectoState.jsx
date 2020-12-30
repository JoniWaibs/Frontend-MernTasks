//el state del proyecto + funciones con dispatch hacia los types
import React, { useReducer } from 'react'
//importar el context que disponibiliza todos lso datos
import ProyectoContext from './ProyectoContext'
//importar el reducer que tiene los types para evaluar y modificar el state
import  ProyectoReducer  from './ProyectoReducer'
import clienteAxios from '../Config/Axios'
import { 
    FORMULARIO_PROYECTO , 
    OBTENER_PROYECTOS,
    CARGAR_NUEVO_PROYECTO,
    VALIDAR_INPUT,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO_ACTUAL,
} from '../Types/index'




//declarar el state del proyecto
const ProyectoState = props => {
    //state inicial
    const initialState = { formulario : false , proyectos : [], alerta: null , proyecto: null};
    // Dispatch para modificar los types, initialState === al state inicial declarado arriba
    const [ state , dispatch ] = useReducer(ProyectoReducer , initialState);
    
    //funciones de la aplicacion en torno a los proyectos//
    //muestra el formulario para cargar proyectos
    const mostrarForm = () =>{ dispatch({ type: FORMULARIO_PROYECTO })};
    //obtener todos los proyectos para mostrar
    const obtenerProyectos = async () =>{ 

        try {
            const result = await clienteAxios.get('/api/projects')
            dispatch({ type: OBTENER_PROYECTOS, payload: result.data })
        } catch (error) {
            console.log(error)
        }
    };
    //carga nuevos proyectos al array de proyectos (genero id)
    const cargarProyectoNuevo = async proyecto =>{ 
        try {
            const result = await clienteAxios.post('/api/projects', proyecto)
            dispatch({ type: CARGAR_NUEVO_PROYECTO, payload: result.data })
        } catch (error) {
            console.log(error)
        }
     };
    //validar inputs de formulario para mostrar alerta
    const mostrarAlerta = msj => { dispatch({ type: VALIDAR_INPUT, payload: msj })}
    //colocar uno de los proyectos en activo para ver sus tareas a traves de su id
    const activarProyecto = idProy => { dispatch({ type: PROYECTO_ACTUAL, payload: idProy  }) }
    //elimina un proyecto x id
    const eliminarProyecto = async idProy => { 
        console.log(idProy)
        try {
            await clienteAxios.delete(`/api/projects/${idProy}`)
            dispatch({ type: ELIMINAR_PROYECTO_ACTUAL , payload: idProy }) 
        } catch (error) {
            console.log(error)
        }
    }




    //PROVIDER
    return(
        //envio el state + las funciones a toda la aplicacion
        <ProyectoContext.Provider 
            value={{
                proyectos : state.proyectos,
                proyecto: state.proyecto, 
                formulario : state.formulario , 
                alerta: state.alerta,
                mostrarForm , 
                cargarProyectoNuevo , 
                obtenerProyectos, 
                mostrarAlerta,
                activarProyecto,
                eliminarProyecto
            }}
        > 
        { props.children } 
        </ProyectoContext.Provider>
    );
};
export default ProyectoState
