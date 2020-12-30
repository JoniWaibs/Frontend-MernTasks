import React, { useContext , useEffect} from "react";
import Proyecto from "../Components/Proyecto";
import ProyectoContext from "../Context/ProyectoContext";

const ListadoProyectos = () => {
  //state inicial + array de proyectos para mostrarlos
  const proyectosContext = useContext( ProyectoContext );
  const { proyectos , obtenerProyectos } = proyectosContext;
  //ejectutar mostrar los proyectos en el sidebar
  useEffect(() => {
     const showProyectos = () =>{ obtenerProyectos() };
     showProyectos()
     //eslint-disable-next-line
  }, [])

  return (
    <ul>
        {proyectos.length > 0
          ? 
            proyectos.map((proyecto) => ( <Proyecto key={proyecto._id} proyecto={proyecto} />))
          : 
            <p>No hay proyectos. Comienza creando uno!</p>
        }
    </ul>
  );
};

export default ListadoProyectos;
