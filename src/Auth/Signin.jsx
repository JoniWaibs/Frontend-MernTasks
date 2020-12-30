import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertasContext from "../Context/AlertasContext";
import AuthContext from "../Context/AuthContext";

const Signin = (props) => {
  //Context de alertas
  const alertacontext = useContext(AlertasContext);
  const { alerta, mostrarAlerta } = alertacontext;

  //contex auth
  const authcontext = useContext(AuthContext);
  const { registrarUsuario, mensaje, autenticado } = authcontext;

  //effect para chequear cuando haya un mensaje y mostrarlo, o cuando haya una autenticacion redirigir
  useEffect(() => {
    if (autenticado) props.history.push("/proyectos");
    if (mensaje) mostrarAlerta(mensaje.msj, mensaje.categoria);
    //eslint-disable-next-line
  }, [mensaje, autenticado]);

  //state del componente + destructuring
  const [userSignin, setUserSignin] = useState({ nombre: "", email: "", password: "", confirmar: "", });
  const { nombre, email, password, confirmar } = userSignin;
  
  //completar el state del componente
  const inputData = (e) => setUserSignin({ ...userSignin, [e.target.name]: e.target.value });

  //crear cuenta para acceder al admin
  const submitSignin = (e) => {
    e.preventDefault();
    //validar campos
    if ( nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmar.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //password minimo 6 caracteres
    if (password.length < 6 || confirmar.length < 6) {
      mostrarAlerta(  "Tu password debe tener al menos 6 caracteres", "alerta-error");
      return;
    }
    //passwords iguales
    if (password !== confirmar) {
      mostrarAlerta("Tus passwords no son iguales", "alerta-error");
      return;
    }
    //enviar al action para ingresar
    registrarUsuario({ nombre, email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <form onSubmit={submitSignin}>
          <h1>Crear una cuenta gratis!</h1>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              placeholder="Ej: Gonzalo Gonzalez"
              onChange={inputData}
            />
          </div>
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
            <label htmlFor="confirmar">Confirmar Password:</label>
            <input
              type="password"
              name="confirmar"
              id="confirmar"
              value={confirmar}
              placeholder="Tu Password"
              onChange={inputData}
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn-primario btn btn-block">
              Iniciar Sesion
            </button>
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta"> Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default Signin;
