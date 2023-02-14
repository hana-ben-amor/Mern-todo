import {useState,useEffect} from 'react';
const API_BASE='http://localhost:3001';
function App() {
    const [todos,setTodos]=useState([]);
    const [popupActive,setPopupActive]=useState(false);
    const [newTodo,setNewTodo]=useState("");
    
    useEffect(() => {
            GetTodos();
    },[])

    const GetTodos=async ()=>{
        await fetch('http://localhost:3001/todos')
            .then(res =>res.json())
            .then(data =>setTodos(data))
            .catch(err=>console.error("Error : ",err));
    }


    const AddTodo=async ()=>{
        const data=await fetch('http://localhost:3001/todo/new',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                text:newTodo
            })
        }).then(res=>res.json);
        setTodos([...todos,data]);
        setPopupActive(false);
        setNewTodo("");
    }
    const completeTodo=async id =>{
        const data =  await fetch(`${API_BASE}/todo/complete/${id}`)
        .then(res =>res.json());
        setTodos(todos=>todos.map(todo =>{
                if(todo._id===data._id)
                {todo.completed=data.completed;}
                return todo;
            }));
        }

    const DeleteTodo=async _id =>{
        const data = await fetch(`http://localhost:3001/todo/delete/${_id}`,{method:"DELETE"}).then(res=>res.json());

        setTodos(todos => todos.filter(todo => todo._id !== data._id));
    }

return (
	<div className="App">
        <h1>Welcome, Hana</h1>
        <h4>Your Tasks </h4>
        <div className="todos">
            {todos.length>0 ? todos.map(todo=>(
            <div className={"todo " + (todo.completed ?"is-complete":"")} key={todo._id} onClick={
                ()=>completeTodo(todo._id)}>
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={()=>{DeleteTodo(todo._id)}}>x</div>
            </div>)
            ):(<p>You currently have no tasks </p>)}
            
            </div>
        
            <div className="addPopUp" onClick={()=> setPopupActive(true)}>+</div>
            {popupActive?(
                    <div className="popup">
                    <div className="closePopup" onClick={()=>{
                        setPopupActive(false)
                    }}>x</div>

                    <div className="content">
                        <h3>Add Task</h3>
                        <input type="text" className="add-todo-input" value={newTodo} onChange={e=>setNewTodo(e.target.value)} />
                        <div className="button" onClick={AddTodo}>Create Task</div>
                    </div>
                    </div>
                ):''}
        </div>
);
}

export default App