import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../data/slices/taskSlice';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

const Home = () => {
    const theme = useSelector(selectTheme);
    return (
        <div style={{height:"100vh"}} className={`container-fluid ${theme}`}>
            <h2 style={{position:'relative',top:20}}className="text-center">Task Management App</h2>
            <TaskForm />
            <TaskList />
        </div>
    )
}

export default Home