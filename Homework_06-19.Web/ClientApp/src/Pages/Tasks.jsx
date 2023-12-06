import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import { useAuth } from "../AuthContext";


const Tasks = () => {

    const { user } = useAuth();
    const [newTask, setNewTask] = useState({
        title: '',
        taskStatus: 'available',
    });
    const [allTasks, setAllTasks] = useState([]);
    const connectionRef = useRef(null);

    const loadTasks = async () => {
        const { data } = await axios.get('/api/tasks/alltasks');
        setAllTasks(data);
    }


    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/tasks").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('newTask', taskItem => {
                setAllTasks(tasks => [...tasks, taskItem]);
            });

            connection.on('updateTaskList', allTasks => {
                setAllTasks([...allTasks]);
            });
        }

        connectToHub();
        loadTasks();

    }, []);

    const onTextChange = e => {
        const copy = { ...newTask }
        copy[e.target.name] = e.target.value;
        setNewTask(copy);
    }

    const addTask = async () => {
        await axios.post('/api/tasks/addtask', newTask);
        setNewTask({ title: '', taskStatus: 'available' });
    }


    const updateTaskStatus = async (currentTaskItem, status) => {
        currentTaskItem.taskStatus = status;
        currentTaskItem.user = user;
        currentTaskItem.userId = user.id;
        await axios.post('/api/tasks/updatetaskstatus', currentTaskItem);
    }

    return (
        <div className="container mt-5">
            <div className="row mb-2">
                <div className="col-md-10">
                    <input value={newTask.title} name="title" onChange={onTextChange} type="text" className="form-control" placeholder="Task Title" />
                </div>
                <div className="col-md-2">
                    <button onClick={addTask} className="btn btn-primary w-100">Add Task</button>
                </div>
            </div>
            < table className="table table-striped table-hover table-bordered" >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allTasks.map(taskItem => {
                        const myTask = user.id == taskItem.userId;
                        return <><tr key={taskItem.id}>
                            <td>{taskItem.title}</td>
                            <td>{!taskItem.userId ? (
                                <button className=" btn btn-info w-100" onClick={() => updateTaskStatus(taskItem, 'inProgress')}>
                                    I'm doing this one!
                                </button>
                            ) : myTask ? (
                                <button onClick={() => (updateTaskStatus(taskItem, 'done'))} className="btn btn-success w-100">I'm done!</button>
                            ) : (
                                <button disabled className="btn btn-warning">
                                    Currently being done by {taskItem.user.firstName} {taskItem.user.lastName}
                                </button>
                            )
                            }</td>
                        </tr></>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Tasks;