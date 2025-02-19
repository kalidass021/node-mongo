import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  record: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
});

const Todo = model('Todo', todoSchema);

export default Todo;
