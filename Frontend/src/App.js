import './App.css';
import Formulario from './components/Formulario';
import { useState } from 'react';
import ListaDeTareas from './components/ListaDeTareas';
import Login from './components/Login';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();

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

    let usuarioActual = datos.filter(function (datos) {
      return datos.email == user.name;
    })

    usuarioActual.map((tarea) => {
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

    let usuarioActual = datos.filter(function (datos) {
      return datos.email == user.name;
    })

    usuarioActual.map((tarea) => {
      const listadoActualizado = {
        id: tarea._id,
        name: [tarea.descripcion],
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

    let usuarioActual = datos.filter(function (datos) {
      return datos.email == user.name;
    })

    usuarioActual.map((tarea) => {
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

    let usuarioActual = datos.filter(function (datos) {
      return datos.email == user.name;
    })

    usuarioActual.map((tarea) => {
      const listadoActualizado = {
        id: tarea._id,
        name: tarea.descripcion,
        pendiente: tarea.pendiente
      }
      listadetareas.push(listadoActualizado);
    })
    setListadetareas(listadetareas);
  }

  async function guardarTarea(event) {
    event.preventDefault();
    const nuevaTarea = document.querySelector("#nuevaTareaARealizar").value;
    const parametros = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ descripcion: nuevaTarea, email: user.name })
    }
    const respuestaServidor = await fetch("http://localhost:4000/notas/", parametros);
    const datos = await respuestaServidor.json();
    setListadetareas([...listadetareas, datos]);
    await buscaTodasLasTareasGuardadas();
  }

  function borrarPorId(id) {
    const listadoActualizado = listadetareas.filter(tarea => tarea.id !== id);
    setListadetareas(listadoActualizado);
  }
  async function editar(e) {
    const descripcionDeTarea = e.target.previousSibling.previousSibling;
    const idDeTarea = descripcionDeTarea.getAttribute('id');
    console.log(idDeTarea);
  };  

  return (

    <div className="App">

      {isAuthenticated ?

        [<Formulario
          guardarTarea={event => guardarTarea(event)}
        />
        , <ListaDeTareas
          todasTareas={listadetareas}
          borraTarea={id => borrarPorId(id)}
          buscaTareasPendientes={() => buscaTodasLasTareasPendientes()}
          buscaTareasGuardadas={() => buscaTodasLasTareasGuardadas()}
          buscaTareasCompletadas={() => buscaTodasLasTareasCompletadas()}
          eliminarTareasCompletadas={() => eliminaTodasLasTareasCompletadas()}
        />]
        : <Login />}
        
    </div>
  );
}

export default App;
