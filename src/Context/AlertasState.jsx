import React, { useReducer } from 'react'
import AlertasContext from './AlertasContext'
import AlertasReducer from './AlertasReducer'
import { MOSTRAR_ALERTA , OCULTAR_ALERTA } from '../Types/index' 


//declarar el state de las alertas
const AlertasState = props =>{

    //state inicial
    const initialState = { alerta: null }
    const [ state , dispatch ] = useReducer( AlertasReducer , initialState )

    //funciones
    const mostrarAlerta = ( msj , categoria ) => { 
        dispatch({ type: MOSTRAR_ALERTA, payload:{ msj, categoria }})
        setTimeout(()=>{ dispatch({ type: OCULTAR_ALERTA }) }, 3000) 
    }

    //provider
    return(
        <AlertasContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta,
            }}
        >
            { props.children }
        </AlertasContext.Provider>
    );

}

export default AlertasState;