import React, { useReducer } from 'react'
import TareasContext from '../Context/TareasContext'
import  TareasReducer  from '../Context/TareasReducer'
import clienteAxios from '../Config/Axios'
import {
    OBTENER_TAREAS,
    CARGAR_NUEVA_TAREA ,
    VALIDAR_INPUT_TAREAS,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA,
} from '../Types/index'

//declarar el state de las tareas
const TareasState = props =>{
    //definir el state inicial
    const initialState ={ 
        tareasProyecto: [],
        alerta: false,
        edicionTarea: null,
    }
    // Dispatch para modificar los types, initialState === al state inicial declarado arriba
    const [ state , dispatch ] = useReducer( TareasReducer , initialState );
    
    //funciones de la aplicacion en torno a las tareas//
    //obtener las tareas de un proyecto
    const activarTareas = async proyectoId => {

        try {
            const result = await clienteAxios.get('/api/tareas' , { params : { proyectoId }})

            dispatch({ type: OBTENER_TAREAS, payload: result.data })
        } catch (error) {
            console.log(error)
        }
    };
    //cargar una nueva tarea
    const cargarTarea = async tarea => { 

        try {
            const result = await clienteAxios.post('/api/tareas', tarea)
            dispatch({ type: CARGAR_NUEVA_TAREA, payload: result.data }) 
        } catch (error) {
            console.log(error)
        }

    };
    //muestra un alerta para validar el campo nueva tarea
    const showAlerta = () => { dispatch({ type: VALIDAR_INPUT_TAREAS }) };
    //elimina una tarea
    const eliminarTarea = async (idTarea, proyectoId)  =>{ 

        try {
            await clienteAxios.delete(`/api/tareas/${idTarea}` , { params: { proyectoId } })

            dispatch({ type: ELIMINAR_TAREA , payload: idTarea })
        } catch (error) {
            console.log(error)
        }
     };
    //editar la tarea
    const editarTarea = async  tarea =>{ 

        try {
            const result = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea )
            dispatch({ type: EDITAR_TAREA, payload: result.data })
        } catch (error) {
            console.log(error)
        }
     };
    //conseguir una tarea para editar
    const conseguirTarea = tarea =>{ dispatch({ type:TAREA_ACTUAL, payload: tarea }) }



    //PROVIDER
    return(
        //envio el state + las funciones a toda la aplicacion
        <TareasContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                alerta: state.alerta,
                edicionTarea: state.edicionTarea,
                activarTareas,
                cargarTarea,
                showAlerta,
                eliminarTarea, 
                conseguirTarea,
                editarTarea
            }}
        >
            { props.children }
        </TareasContext.Provider>
    )
}

export default TareasState;