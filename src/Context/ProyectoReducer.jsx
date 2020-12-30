import { 
    FORMULARIO_PROYECTO , 
    OBTENER_PROYECTOS,
    CARGAR_NUEVO_PROYECTO,
    VALIDAR_INPUT,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO_ACTUAL,
} from '../Types/index'

const ProyectoReducer = ( state , action ) => {
    //el switch evalua los actions que vienen del state
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario: true, 
            };
        case OBTENER_PROYECTOS:
            return{
                ...state,
                proyectos: action.payload, 
            };
        case CARGAR_NUEVO_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],//toma los proyectos que estan y agrega uno nuevo
                formulario: false,
                alerta: null
            };
        case VALIDAR_INPUT:
            return{
                ...state,
                alerta: action.payload
            };
        case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto: state.proyectos.filter( proy => proy._id === action.payload)//itera sobre todos los proyectos de la ddbb y me devuelde el que estoy dando click
            }
        case ELIMINAR_PROYECTO_ACTUAL:
            return{
                ...state,
                proyectos: state.proyectos.filter( proy => proy._id !== action.payload ),
                proyecto: null, 
            }                    
        default:
            return state;
    };
};

export default ProyectoReducer;