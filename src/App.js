import React from "react";
import Login from "./Auth/Login";
import Signin from "./Auth/Signin";
import Private from './Components/Private'
import TokenAuth from './Config/TokenAuth'
import AuthState from "./Context/AuthState";
import TareasState from "./Context/TareasState";
import AlertasState from "./Context/AlertasState";
import ProyectoState from "./Context/ProyectoState";
import MainProjects from "./Components/MainProjects";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


//revisar si hay un token activo
const token = localStorage.getItem('token')
if( token ) TokenAuth( token )


function App() {
  console.log(process.env.REACT_APP_BACKEND)
  return (

    
      <ProyectoState>
        <TareasState>
          <AlertasState>
            <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />  
                  <Private exact path="/proyectos" component={MainProjects} />
                  <Route exact path="/signin" component={Signin} />
                </Switch>
              </Router>
            </AuthState>
          </AlertasState>
        </TareasState>
      </ProyectoState>
    
    
  );
}

export default App;
