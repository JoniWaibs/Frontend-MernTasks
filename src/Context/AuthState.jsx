import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import clienteAxios from '../Config/Axios'
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,   
    CERRAR_SESION
} from '../Types/index'
//importar la funcion que envia los tokens
import TokenAuth from '../Config/TokenAuth'



//declarar el state iniciarl del auth
const AuthState = props =>{
    //state inicial
    const initialState = { 
        token: localStorage.getItem('token'),//obtengo el token de ls
        autenticado: null,  
        usuario: null,
        mensaje: null,
        cargando: true,
    }
    const [ state, dispatch ] = useReducer( AuthReducer , initialState )
    
    //funciones
    const registrarUsuario = async data =>{

        try {
            const result = await clienteAxios.post('/api/users/signin', data)
           //guardar el token que retorna la api en el state y luego en ls
            dispatch({ type:REGISTRO_EXITOSO, payload: result.data})  
            //obtener el usuario
            usuarioAutenticado(); 
        } catch (error) {
            // console.log(error.response.data.msj)
            const alerta = { msj: error.response.data.msj , categoria: 'alerta-error' }
            dispatch({ type:REGISTRO_ERROR , payload: alerta })        
        }
    }
    //devuelve un usuario autenticado, debo enviar el token por header
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token')
        
        //envia los tokens por header al backend 
        if( token ) TokenAuth( token ); 
        try {
            const result = await clienteAxios.get('/api/users')
            dispatch({ type: OBTENER_USUARIO, payload: result.data })

        } catch (error) {
            console.log(error.response.data)
            dispatch({ type: LOGIN_ERROR })
        }    
    }
    const iniciarSesion = async data =>{

        try {
            const result = await clienteAxios.post('/api/users/login', data)
            dispatch({ type: LOGIN_EXITOSO, payload: result.data })
            //obtener el usuario
            usuarioAutenticado(); 
        } catch (error) {
            const alerta = { msj: error.response.data.msj , categoria: 'alerta-error'}
            dispatch({ type: LOGIN_ERROR , payload: alerta })
        }
    }
    const cerrarSesion = () =>{ dispatch({ type: CERRAR_SESION }) }
 


    //provider
    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthState;
