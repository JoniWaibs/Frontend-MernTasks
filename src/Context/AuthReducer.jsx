import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,   
    CERRAR_SESION
} from '../Types/index'



const AuthReducer = ( state , action ) =>{
     
    switch( action.type ){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token)//guardo el token en ls
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
            }
        case REGISTRO_ERROR:
            localStorage.removeItem('token')//limpio ls
            return{
                ...state,
                mensaje: action.payload,
                token: null,
                cargando: false,
            }
        case LOGIN_ERROR:
            localStorage.removeItem('token')//limpio ls
            return{
                ...state,
                mensaje: action.payload,
                token: null,
                cargando: false,
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false,
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')//limpio ls
            return{
                ...state,
                token: null,
                autenticado: null,  
                usuario: null,
                mensaje: null,
                cargando: false,
            }
    


        default:
            return state;
    };
};

export default AuthReducer;