import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../../data/slices/taskSlice';

export const TaskPopup = ({ show, handleClose, taskToEdit }) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState('');
    const [taskStatus, setTaskStatus] = useState('Todo');
    const [taskNote, setTaskNote] = useState('');
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTaskName(taskToEdit.name);
            setTaskStatus(taskToEdit.status);
            setTaskNote(taskToEdit.note || '');
        }
    }, [taskToEdit]);

    const handleAddOrUpdateTask = () => {
        if (!taskName.trim()) {
            setValidationError('Task name cannot be empty');
            return;
        }

        const newTask = {
            name: taskName,
            status: taskStatus,
            note: taskNote,
        };

        if (taskToEdit) {
            dispatch(updateTask(taskToEdit._id, newTask));
        } else {
            dispatch(createTask(newTask));
        }

        setTaskName('');
        setTaskStatus('')
        setTaskNote('');
        setValidationError('');

        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{taskToEdit ? 'Edit Task' : 'Create Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTaskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) => {
                                setTaskName(e.target.value);
                                setValidationError('');
                            }}
                            isInvalid={!!validationError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formTaskStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                        >
                            <option value="Todo">Todo</option>
                            <option value="InProgress">InProgress</option>
                            <option value="Completed">Completed</option>
                            <option value="Archive">Archive</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formTaskNote">
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={taskNote}
                            onChange={(e) => setTaskNote(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button style={{backgroundColor:"rgb(79, 17, 186)", color:'white'}} variant="" onClick={handleAddOrUpdateTask}>
                    {taskToEdit ? 'Update Task' : 'Create Task'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
