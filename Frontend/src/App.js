import './App.css';
import MainForm from './components/MainForm';
import Login from './components/Login';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';
import Error from './components/Error';

function App() {
  const [openDialog, setOpenDialog] = useState(false); 
  const [message, setmessage] = useState(null);
  const { isAuthenticated } = useAuth0();
  const [thingsToDo, SetThingsToDo] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState();
  const [edit2, setEdit2] = useState(false);
  const [seleccion, setSeleccion] = useState("all");
  const { user } = useAuth0();

 const handleDialogClose = () => {
    setOpenDialog(false);
  };
 
  async function findAllPendingTasks() {
    try {
      const options = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      };  
      const responseServer = await fetch("http://localhost:4000/notas/pending/?user=" + user.name, options);      
      const serverdata = await responseServer.json();
      const thingsToDo = serverdata.map((task) => ({
        id: task._id,
        name: task.name,
        pending: task.pending,
      }));
      SetThingsToDo(thingsToDo);
      setSeleccion("active");
    } catch (error) {
      setmessage(error.message)
     setOpenDialog(true)
    }
  }
  

async function FindAllSavedTasks() {
const usuario = user.name || "usuario"
  try {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const responseServer = await fetch("http://localhost:4000/notas/?user=" + usuario, options);
    const serverdata = await responseServer.json();
    const thingsToDo = serverdata.map((task) => ({
      id: task._id,
      name: [task.name],
      pending: task.pending
    }));

    SetThingsToDo(thingsToDo);
    setSeleccion("all");
  } catch (error) {
console.error(error.message);
setmessage(error.message);
setOpenDialog(true);

  }
}

  async function findAllCompletedTasks() {
    try {
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
       return thingsToDo.push(listUpdated);
      });  
      SetThingsToDo(thingsToDo);
      setSeleccion("completed");
    } catch (error) {
      setmessage(error.message)
      setOpenDialog(true)
    }
  }


  async function removeAllCompletedTasks() {
    try {
      const options = {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
    await fetch("http://localhost:4000/notas/remove/made?user=" + user.name, options);
      FindAllSavedTasks();
    } catch (error) {
      setmessage(error.message)
      setOpenDialog(true)
    }
  }


  async function saveTask(event) {
    try {
      event.preventDefault();
  
      if (edit2 === false) {
        const newTask = document.querySelector("#newTaskToPerform").value;
        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newTask, email: user.name })
        };
        await fetch("http://localhost:4000/notas/", options);
          setSeleccion("active");
        await findAllPendingTasks();
      } else {
        const newTask = document.querySelector("#newTaskToPerform").value;
        const options = {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newTask })
        };
         await fetch("http://localhost:4000/notas/" + id, options);
        }
  
      setEdit();
      setEdit2(false);
    } catch (error) {
      setmessage(error.message)
      setOpenDialog(true)
    }
  }

  async function editTask(e) {
    e.preventDefault();
    const taskId = e.target.previousSibling.previousSibling.getAttribute('id');
    const contents = document.getElementById(taskId).innerHTML;
    setEdit(contents)
    setEdit2(true)
    setId(taskId)
  }

  async function putCompleted(event) {
    try {
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
  
    } catch (error) {
      setmessage(error.message)
      setOpenDialog(true)
    }
  }

  async function remove(taskId) {
    try {
      const options = {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      };
  
    await fetch("http://localhost:4000/notas/" + taskId, options);
    
      const listUpdated = thingsToDo.filter(task => task.id !== taskId);
      SetThingsToDo(listUpdated);
    } catch (error) {
      setmessage(error.message)
      setOpenDialog(true)
    }
  }

  useEffect(() => {
    if (user) {
      FindAllSavedTasks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  useEffect(() => {
    if (seleccion === "all") {
      FindAllSavedTasks();
    }
    if (seleccion === "active") { findAllPendingTasks(); }
    if (seleccion === "completed") { findAllCompletedTasks(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit2]);

  return (

    <div className="App">
      {isAuthenticated ?
      <>     <MainForm

          saveTask={event => saveTask(event)}
          edit2={edit2}
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

        /> <Error 
        open={openDialog}
        onClose={handleDialogClose}
        menssage={message}
        />
      </>
   
        : <Login />}
    </div>
  );
}

export default App;

