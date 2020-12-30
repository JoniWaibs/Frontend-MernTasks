import {
    OBTENER_TAREAS,
    CARGAR_NUEVA_TAREA ,
    VALIDAR_INPUT_TAREAS,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA,
} from '../Types/index'



const TareasReducer = ( state , action ) =>{
    //el switch evalua los actions que vienen del state
    switch( action.type ){
        case OBTENER_TAREAS:
            return{
                ...state,
                tareasProyecto: action.payload,
            };
        case CARGAR_NUEVA_TAREA:
            return{
                ...state,
                tareasProyecto: [...state.tareasProyecto, action.payload],
                alerta:false,
            };    
        case VALIDAR_INPUT_TAREAS:
            return{
                ...state,
                alerta : true,
            };    
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasProyecto: state.tareasProyecto.filter( tarea => tarea._id !== action.payload)
            };
        case TAREA_ACTUAL:
            return{
                ...state,
                edicionTarea: action.payload,
            };    
        case EDITAR_TAREA:
            return{
                ...state,
                tareasProyecto: state.tareasProyecto.map( tarea => tarea._id === action.payload._id ? action.payload : tarea ),
                edicionTarea: null,
            }    

        default:
            return state;
    }
}

export default TareasReducer;
