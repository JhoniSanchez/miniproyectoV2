import './App.css';
import MainForm from './components/MainForm';
import Login from './components/Login';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';

function App() {

  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();

  const [thingsToDo, SetThingsToDo] = useState([]);

  const [id, setId] = useState("");
  const [edit, setEdit] = useState();
  const [edit2, setEdit2] = useState(false);
  const [seleccion, setSeleccion] = useState("all");


  async function findAllPendingTasks() {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const responseServer = await fetch("http://localhost:4000/notas/pending/?user=" + user.name, options);
    const serverdata = await responseServer.json();
    const thingsToDo = [];

    serverdata.map((task) => {
      const listUpdated = {
        id: task._id,
        name: task.name,
        pending: task.pending,
        
      }
      thingsToDo.push(listUpdated);
    })

    SetThingsToDo(thingsToDo);

    setSeleccion("active");
  }

  async function FindAllSavedTasks() {
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
        name: [task.name],
        pending: task.pending
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
    const responseServer = await fetch("http://localhost:4000/notas/made/?user=" + user.name, options);
    const serverdata = await responseServer.json();
    const thingsToDo = [];

    serverdata.map((task) => {
      const listUpdated = {
        id: task._id,
        name: task.name,
        pending: task.pending
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
    await fetch("http://localhost:4000/notas/remove/made?user=" + user.name, options);
    FindAllSavedTasks();
  }

  async function saveTask(event) {
    event.preventDefault();

    if (edit2 === false) {
      const newTask = document.querySelector("#newTaskToPerform").value;
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTask, email: user.name })
      }
      await fetch("http://localhost:4000/notas/", options);
      setSeleccion("active");
      await findAllPendingTasks();
      // SetThingsToDo([...thingsToDo, { name: newTask, pending:true, email: user.name }])

    }
    else {
      const newTask = document.querySelector("#newTaskToPerform").value;
      const options = {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTask })
      }
      await fetch("http://localhost:4000/notas/" + id, options);
    }
    setEdit()
    setEdit2(false)
  }

  async function editTask(e) {
    e.preventDefault();
    const taskId = e.target.previousSibling.previousSibling.getAttribute('id');
    const contents = document.getElementById(taskId).innerHTML;

    // console.log(taskId)
    // console.log(contents)

    setEdit(contents)
    setEdit2(true)
    setId(taskId)

  }

  async function putCompleted(event) {
    const CompletedBox = event.target;
    
    if (CompletedBox.classList.contains("0")) {
      CompletedBox.style.color = "blue";
    }
    const options = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const taskId = CompletedBox.parentElement.nextSibling.getAttribute('id');
    await fetch("http://localhost:4000/notas/markdone/" + taskId, options);
  }

  async function remove(event) {
    const taskId = event.target.previousSibling.getAttribute('id');
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    }
    await fetch("http://localhost:4000/notas/" + taskId, options);
    const listUpdated = thingsToDo.filter(task => task.id !== taskId);
    SetThingsToDo(listUpdated);
  }

  useEffect(() => {
    if (user) {
      FindAllSavedTasks();
    }
  }, [user]);

  useEffect(() => {
    if (seleccion === "all") {
      FindAllSavedTasks();
    }
    if (seleccion === "active") { findAllPendingTasks(); }
    if (seleccion === "completed") { findAllCompletedTasks(); }
  }, [edit2]);

  return (

    <div className="App">
      {isAuthenticated ?
        <MainForm

          saveTask={event => saveTask(event)}
          
          edit={edit}
          setEdit={(e)=>setEdit(e.target.value)}

          allTasks={thingsToDo}
          editTask={event => editTask(event)}
          remove={(event) => remove(event)}
          putCompleted={(event) => putCompleted(event)}

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

