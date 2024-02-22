import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { selectTasks, updateTask } from '../../data/slices/taskSlice';
import { TaskCard } from './TaskCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/TaskList.css'

export const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const [, dropTodo] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== 'Todo') {
        dispatch(updateTask(item.id, { ...item, status: 'Todo' }));
      }
    },
  });

  const [, dropInProgress] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== 'InProgress') {
        dispatch(updateTask(item.id, { ...item, status: 'InProgress' }));
      }
    },
  });

  const [, dropCompleted] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== 'Completed') {
        dispatch(updateTask(item.id, { ...item, status: 'Completed' }));
      }
    },
  });

  const [, dropArchive] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== 'Archive') {
        dispatch(updateTask(item.id, { ...item, status: 'Archive' }));
      }
    },
  });

  const containerStyle = {
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    maxHeight: '300px', // Set the desired height
  };

  return (
    <div className="d-flex">
      <div ref={dropTodo} className="flex-fill me-2 p-3 task-list" style={{ ...containerStyle, borderRight: '1.5px dashed #261da6' }}>
        <h2 className="mb-3 text-center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.5rem' }}>
          Todo
        </h2>
        {tasks
          .filter((task) => task.status === 'Todo')
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
      <div
        ref={dropInProgress}
        className="flex-fill me-2 p-3 task-list"
        style={{ ...containerStyle, borderRight: '1.5px dashed #261da6' }}
      >
        <h2 className="mb-3 text-center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.5rem' }}>
          In Progress
        </h2>
        {tasks
          .filter((task) => task.status === 'InProgress')
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
      <div
        ref={dropCompleted}
        className="flex-fill me-2 p-3 task-list"
        style={{ ...containerStyle, borderRight: '1.5px dashed #261da6' }}
      >
        <h2 className="mb-3 text-center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.5rem' }}>
          Completed
        </h2>
        {tasks
          .filter((task) => task.status === 'Completed')
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
      <div
        ref={dropArchive}
        className="flex-fill p-3 task-list"
        style={{ ...containerStyle }}
      >
        <h2 className="mb-3 text-center position-sticky" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.5rem' }}>
          Archive
        </h2>
        {tasks
          .filter((task) => task.status === 'Archive')
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
    </div>
  );
};
