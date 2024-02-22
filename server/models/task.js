const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Todo', 'InProgress', 'Completed', 'Archive'],
    default: 'Todo',
  },
  note: String,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;