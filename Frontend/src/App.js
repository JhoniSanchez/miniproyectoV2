import './App.css';
import Formulario from './components/Formulario';
import {useState} from 'react';
import ListaDeTareas from './components/ListaDeTareas';


function App() {

  const [listadetareas, setListadetareas] = useState([]);


  async function buscaTodasLasTareasPendientes() {
    const parametros = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const respuestaServidor = await fetch("http://localhost:4000/notas/pendientes", parametros);
    const datos = await respuestaServidor.json();
    const listadetareas = [];

    datos.map((tarea) => {
      const listadoActualizado = {
        id: tarea._id,
        name: tarea.descripcion,
        pendiente: tarea.pendiente
      }
      listadetareas.push(listadoActualizado);
    })
    setListadetareas(listadetareas);
  }

  async function buscaTodasLasTareasGuardadas() {
    const parametros = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const respuestaServidor = await fetch("http://localhost:4000/notas/", parametros);
    const datos = await respuestaServidor.json();
    const listadetareas = [];
    datos.map((tarea) => {
      const listadoActualizado = {
        id: tarea._id,
        name: tarea.descripcion,
        pendiente: tarea.pendiente
      }
      listadetareas.push(listadoActualizado);
    })
    setListadetareas(listadetareas);
  }






  async function buscaTodasLasTareasCompletadas() {
    const parametros = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const respuestaServidor = await fetch("http://localhost:4000/notas/realizadas", parametros);
    const datos = await respuestaServidor.json();
    const listadetareas = [];

    datos.map((tarea) => {
      const listadoActualizado = {
        id: tarea._id,
        name: tarea.descripcion,
        pendiente: tarea.pendiente
      }
      listadetareas.push(listadoActualizado);
    })
    setListadetareas(listadetareas);
  }

  async function eliminaTodasLasTareasCompletadas() {
    const parametros = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const respuestaServidor = await fetch("http://localhost:4000/notas/eliminar/realizadas", parametros);
    const datos = await respuestaServidor.json();
    const listadetareas = [];
    datos.map((tarea) => {
      const listadoActualizado = {
        id: tarea._id,
        name: tarea.descripcion,
        pendiente: tarea.pendiente
      }
      listadetareas.push(listadoActualizado);
    })
    setListadetareas(listadetareas);
  }


  async function guardarTarea() {

    const nuevaTarea = document.querySelector("#nuevaTareaARealizar").value;
    const parametros = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ descripcion: nuevaTarea})
    }
    await fetch("http://localhost:4000/notas/", parametros);
    
  }

  function borrarPorId(id) {
     listadetareas.filter(tarea => tarea.id !== id);
  }
  


  return (


    <div className="App">
        <Formulario
        guardarTarea={event => guardarTarea(event)}
      />
      
      <ListaDeTareas
        todasTareas={listadetareas}
        borraTarea={id => borrarPorId(id)}

        buscaTareasPendientes={() => buscaTodasLasTareasPendientes()}

        buscaTareasGuardadas={() => buscaTodasLasTareasGuardadas()}

        buscaTareasCompletadas={() => buscaTodasLasTareasCompletadas()}

        eliminarTareasCompletadas={() => eliminaTodasLasTareasCompletadas()}        


      />
      

    </div>
  );
}

export default App;