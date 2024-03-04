import { useState } from "react";
import useFetch from "./useFetch";
import { useNavigate } from 'react-router-dom';

const ToDo = () => {
    let navigate = useNavigate();
    let username = sessionStorage.getItem('username');// get currently logged in User

    if (username === null) { navigate('/login') }//Redirect user to login page if not logged in

    let { data, loading, error } = useFetch('http://localhost:8000/todo?username=' + username);
    const [rerender, setRerender] = useState(false);// Dummy to rerender


    let handleTaskDelete = (id) => {
        fetch('http://localhost:8000/todo/' + id,
            {
                method: 'DELETE',
            }
        ).catch(err => {
            console.log("Error: ", err);
        });
        document.getElementById('el-id-' + id).remove();
    }

    let handleTaskAdd = () => {
        fetch('http://localhost:8000/todo',
            {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username: username, data: '', status: false })
            }
        ).then(response => {
            return response.json();
        }).then(json => {
            data.push(json);
            setRerender(!rerender);
        }).catch(err => {
            console.log("Error: ", err);
        });
    }

    let handleTaskDataChange = (el, data) => {
        if (el.data === data) { return; }
        el.data = data;
        fetch('http://localhost:8000/todo/' + el.id,
            {
                method: 'PATCH',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(el)
            }
        ).catch(err => {
            console.log("Error: ", err);
        });
    }

    let handleTaskStatusChange = (el, status) => {
        if (el.status === status) { return; }
        el.status = status;
        fetch('http://localhost:8000/todo/' + el.id,
            {
                method: 'PATCH',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(el)
            }
        ).then(response => {
            if (response.ok) {
                if (status) {
                    document.getElementById(`el-text-${el.id}`).style.textDecoration = "line-through";
                } else {
                    document.getElementById(`el-text-${el.id}`).style.textDecoration = "none";
                }
                setRerender(!rerender);
            }
        }).catch(err => {
            console.log("Error: ", err);
        });
    }

    let handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.target.blur();
        }
    }

    return (
        <div className="todo-pane">
            <h3>To Do:</h3>
            {data &&
                <div className="todo-container" id="todo-container">
                    <button onClick={() => { handleTaskAdd() }} className="add-task">Add Task</button>
                    {data.map((el) => (
                        <div className="todo-element" id={`el-id-${el.id}`} key={`el-id-${el.id}`} >
                            <input id={`el-checkbox-${el.id}`} className="todo-checkbox" type="checkbox" defaultChecked={el.status} onChange={(e) => { handleTaskStatusChange(el, e.target.checked) }}></input>
                            <textarea
                                id={`el-text-${el.id}`}
                                maxLength={128}
                                style={{ textDecoration: el.status ? "line-through" : "none" }}
                                className="todo-text" defaultValue={el.data}
                                onKeyUp={(e) => { handleEnterKey(e) }}
                                onBlur={(e) => { handleTaskDataChange(el, e.target.value) }}></textarea>
                            <button className="todo-delete" onClick={() => { handleTaskDelete(el.id) }}>X</button>
                        </div>
                    ))}
                </div>}
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: '#B52123', fontWeight: 600, fontSize: 20 }}>{error}</div>}
        </div >
    );
}

export default ToDo;