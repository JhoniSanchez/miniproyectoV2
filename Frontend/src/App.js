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
  const [edit2, setEdit2] = useState(true);
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
        pending: task.pending
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
    const responseServer = await fetch("http://localhost:4000/notas/remove/made?user=" + user.name, options);
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
        body: JSON.stringify({ name: newTask, email: user.name })
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
        body: JSON.stringify({ name: newTask })
      }
      const responseServer = await fetch("http://localhost:4000/notas/" + id, options);
      
      await responseServer.json();

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

     async function putCompleted(event) {
        const CompletedBox = event.target;
        let taskDescription = null;

        if (CompletedBox.classList.contains("0")) {
            CompletedBox.style = "color: blue";
            taskDescription = CompletedBox.parentElement.nextSibling;
        } 

        const options = {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const taskId = taskDescription.getAttribute('id');
        const a = await fetch("http://localhost:4000/notas/markdone/" + taskId, options);
    }

    async function remove (event) {
        const taskDescription = event.target.previousSibling;
        const taskId = taskDescription.getAttribute('id');
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const a = await fetch("http://localhost:4000/notas/" + taskId, options);
        deleteById(taskId);
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

  useEffect(() => {
    
      if (seleccion === "bcompleted") {
        FindAllSavedTasks();
      }
    
  }, [seleccion]);


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
          remove = {(event) => remove(event)}
          putCompleted = {(event) => putCompleted(event)}

        />
        : <Login />}
    </div>
  );
}

export default App;

