import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../data/slices/taskSlice';
import { TaskPopup } from './TaskPopup';
import { motion } from 'framer-motion';

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id, status: task.status, name: task.name, note: task.note },
  });

  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleShowEditPopup = () => {
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card ref={drag} className="mb-2 text-center mx-auto" style={{ width: '250px' }}>
        <Card.Body>
          <Card.Title>{task.name}</Card.Title>
          <Card.Text>Status: {task.status}</Card.Text>
          {task.note && <Card.Text>Note: {task.note}</Card.Text>}
          <Button
           
            style={{backgroundColor:'rgb(79, 17, 186)',color:'white'}}
            className="m-1"
            onClick={handleShowEditPopup}
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button
            variant="outline-danger"
            className="m-1"
            onClick={handleDeleteTask}
          >
            <i className="fas fa-trash-alt"></i>
          </Button>
        </Card.Body>

        {/* Edit Task Popup */}
        <TaskPopup
          show={showEditPopup}
          handleClose={handleCloseEditPopup}
          taskToEdit={task}
        />
      </Card>
    </motion.div>
  );
};
