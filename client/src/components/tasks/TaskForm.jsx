import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toggleTheme, selectTheme } from '../../data/slices/taskSlice';
import { TaskPopup } from './TaskPopup';
import Search from './Search';
import { motion } from 'framer-motion';

export const TaskForm = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const theme = useSelector(selectTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`d-flex align-items-center justify-content-between mb-4 ${theme}-theme `}>
        <div className="d-flex align-items-center">
          <Button variant="none" onClick={handleToggleTheme} className="me-3">
            <i style={{ color: theme == 'light' ? 'rgb(245, 162, 36)' : 'white', position: 'relative', fontSize: 25 }} className={`fa ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`} />
          </Button>
        </div>
        <Button variant="none" onClick={handleShowPopup}>
          <i style={{ color: 'rgb(79, 17, 186)', fontSize: 40 }} className="fa fa-plus-circle" />
        </Button>
      </div>

      <TaskPopup taskToEdit={null} show={showPopup} handleClose={handleClosePopup} />
      <Search />
    </motion.div>
  );
};



