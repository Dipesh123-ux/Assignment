import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { searchTasks } from '../../data/slices/taskSlice';
import { motion } from 'framer-motion';

const Search = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(searchTasks(searchQuery));
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchQuery, dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form  className="w-75 mx-auto my-2">
        <Form.Label className="mb-2">Search by Name:</Form.Label>
        <InputGroup>
          <FormControl
            placeholder="Enter task name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form>
    </motion.div>
  );
};

export default Search;
