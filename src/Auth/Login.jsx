import React ,{ useState, useContext , useEffect}  from 'react'
import { Link } from 'react-router-dom'
import AlertasContext from '../Context/AlertasContext'
import  AuthContext  from '../Context/AuthContext'

const Login = (props) => {
    //state del componente + destructuring
    const [ userLogin , setUserLogin ] = useState( { email: "", password:"" } );
    const { email , password } = userLogin;
    //context de auth, 
    const authcontext = useContext( AuthContext );
    const { iniciarSesion , mensaje , autenticado} = authcontext;
    //context alerta
    const alertacontext = useContext( AlertasContext )
    const { alerta , mostrarAlerta } = alertacontext;
    //effect para chequear cuando haya un mensaje y mostrarlo, o cuando haya una autenticacion redirigir
    useEffect(() => {
        if(mensaje) mostrarAlerta(mensaje.msj , mensaje.categoria);
        if(autenticado) props.history.push('/proyectos');
        //eslint-disable-next-line
    }, [mensaje, autenticado])

    //completar state
    const inputData = e => setUserLogin( { ...userLogin, [e.target.name]:e.target.value } );
    //iniciar sesion
    const submitLogin = e =>{
        e.preventDefault()
        //validar campos
        if( email.trim() === "" || password.trim() === ""){
            mostrarAlerta('Algunos campos estan vacios' , 'alerta-error')
            return;
        };
        if( password.length < 6 ){
            mostrarAlerta('Tu password debe tener al menos 6 digitos' , 'alerta-error')
            return;
        };
        
        //enviar datos al action
        iniciarSesion(userLogin)

    };
    
    return (
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{ alerta.msj }</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={submitLogin}>
                    <div className="campo-form">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={email}
                            placeholder="Ej: correo@correo.com"
                            onChange={inputData}
                            />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            value={password}
                            placeholder="Tu Password"
                            onChange={inputData}
                            />
                    </div>
                    <div className="campo-form">
                        <button type="submit" className="btn-primario btn btn-block">Iniciar Sesion</button>
                    </div>
                </form>
                <Link to={"/signin"} className="enlace-cuenta">Crear una cuenta</Link>
            </div>
        </div>
    )
}

export default Login
