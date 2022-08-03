import './App.css';
import MainForm from './components/MainForm';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const [thingsToDo, SetThingsToDo] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState();
  const [edit2, setEdit2] = useState(true);
  const [seleccion, setSeleccion] = useState("all");



  useEffect(() => {
    if (user) {
      FindAllSavedTasks();
    }
  }, [user]);


  useEffect(() => {
    if (edit2) {
      if (seleccion === "all") {
        FindAllSavedTasks();
      }
      if (seleccion === "active") { findAllPendingTasks(); }
      if (seleccion === "completed") { findAllCompletedTasks(); }
      if (seleccion === "bcompleted") { findAllCompletedTasks(); }
    }
  }, [edit2]);


  useEffect(() => {
    if (seleccion) {
      if (seleccion === "bcompleted") {
        FindAllSavedTasks();
      }
    }
  }, [seleccion]);


  async function findAllPendingTasks() {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const responseServer = await fetch("http://localhost:4000/notas/pendientes/?user=" + user.name, options);
    const serverdata = await responseServer.json();
    const thingsToDo = [];


    serverdata.map((task) => {
      const listUpdated = {
        id: task._id,
        name: task.descripcion,
        pendiente: task.pendiente
      }
      thingsToDo.push(listUpdated);
    })
    SetThingsToDo(thingsToDo);
    setSeleccion("active");
  }

  async function 
FindAllSavedTasks() {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const responseServer = await fetch("http://localhost:4000/notas/?user=" + user.name, options);
    const serverdata = await responseServer.json();
    const thingsToDo = [];

    serverdata.map((task) => {
      const listUpdated = {
        id: task._id,
        name: [task.descripcion],

        pendiente: task.pendiente
      }
      thingsToDo.push(listUpdated);
    })
    SetThingsToDo(thingsToDo);
    setSeleccion("all");
  }

  async function findAllCompletedTasks() {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const responseServer = await fetch("http://localhost:4000/notas/realizadas/?user=" + user.name, options);
    const serverdata = await responseServer.json();
    const thingsToDo = [];


    serverdata.map((task) => {
      const listUpdated = {
        id: task._id,
        name: task.descripcion,
        pendiente: task.pendiente
      }
      thingsToDo.push(listUpdated);
    })
    SetThingsToDo(thingsToDo);
    setSeleccion("completed");
  }

  async function removeAllCompletedTasks() {
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const responseServer = await fetch("http://localhost:4000/notas/eliminar/realizadas?user=" + user.name, options);
    const serverdata = await responseServer.json();
    const thingsToDo = [];

    serverdata.map((task) => {
      const listUpdated = {
        id: task._id,
        name: task.descripcion,
        pendiente: task.pendiente
      }
      thingsToDo.push(listUpdated);
    })
    SetThingsToDo(thingsToDo);
    setSeleccion("bcompleted");
  }

  async function saveTask(event) {
    event.preventDefault();

    if (edit2 === true) {
      const newTask = document.querySelector("#newTaskToPerform").value;
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion: newTask, email: user.name })
      }
      const responseServer = await fetch("http://localhost:4000/notas/", options);
      const serverdata = await responseServer.json();
      SetThingsToDo([...thingsToDo, serverdata]);
      setSeleccion("active");
      await findAllPendingTasks();
      

    }
    else {

      const newTask = document.querySelector("#newTaskToPerform").value;
      const options = {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion: newTask })
      }
      const responseServer = await fetch("http://localhost:4000/notas/" + id, options);
      const serverdata = await responseServer.json();

    }
    setEdit()
    setEdit2(true)
  }


  function deleteById(id) {
    const listUpdated = thingsToDo.filter(task => task.id !== id);
    SetThingsToDo(listUpdated);
  }


  async function editTask(e) {
    e.preventDefault();
    const taskDescription = e.target.previousSibling.previousSibling;
    const taskId = taskDescription.getAttribute('id');
    const paragraph = document.getElementById(taskId);
    const contents = paragraph.innerHTML;

    setEdit(contents)
    setEdit2(false)
    setId(taskId)

  }

  return (

    <div className="App">
      {isAuthenticated ?
        <MainForm
          saveTask={event => saveTask(event)}
          editTask={event => editTask(event)}
          edit={edit}
          setEdit={setEdit}
          allTasks={thingsToDo}
          allTasksPending={(e) => findAllPendingTasks(e)}
          deleteTaskById={id => deleteById(id)}
          searchPendingTasks={() => findAllPendingTasks()}
          searchSavedTasks={() => FindAllSavedTasks()}
          searchCompletedTasks={() => findAllCompletedTasks()}
          deleteCompletedTasks={() => removeAllCompletedTasks()}

        />
        : <Login />}
    </div>
  );
}

export default App;

