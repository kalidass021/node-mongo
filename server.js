import express from 'express';
import dbConnect from './src/config/dbConnect.js';
import Todo from './src/models/Todo.js';

const app = express();

// body parser
app.use(express.json());

app.get('/', (req, res) => {
  console.log('api is working');
  res.status(200).json({ message: 'API is working' });
});

// create record
app.post('/api/v1/todo', async (req, res) => {
  const record = req.body;
  // await Todo.create(record);
  // or
  try {
    const newTodo = new Todo(record);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(`Error while saving the todo ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

// get all todos
app.get('/api/v1/todo', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error(`Error while getting todos ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

// get specific todo
app.get('/api/v1/todo/:record', async (req, res) => {
  try {
    const { record } = req.params;
    const todo = await Todo.findOne({ record });
    if (!todo) {
      return res
        .status(404)
        .json({ message: `${record} not found in the database` });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error(`Error while getting the todo: ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

// update todo
app.patch('/api/v1/todo/:record', async (req, res) => {
  try {
    const { record: oldRecord } = req.params;
    const { newRecord } = req.body;

    const response = await Todo.updateOne(
      { record: oldRecord },
      {
        $set: {
          record: newRecord,
        },
      }
    );

    res.status(201).json(response);
  } catch (err) {
    console.error(`Error while updating the todo ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

// delete todo
app.delete('/api/v1/todo/:record', async (req, res) => {
  try {
    const { record } = req.params;

    const response = await Todo.deleteOne({record});

    res.status(200).json(response);
  } catch (err) {
    console.error(`Error while deleting the record ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json(`${req.originalUrl} not found`);
});

const start = async () => {
  try {
    // connect to db
    await dbConnect();
    const port = 5000;
    const server = app.listen(port, () => {
      console.info(`Server is up and listening on port ${port}`);
    });

    return server;
  } catch (err) {
    console.error(`Startup Error: ${err}`);
    process.exit(1);
  }
};

start();

/* 
    What is database ?
        * Database is efficient way of storing data which helps us query data faster in a bunch of data.


    Why we need database ?
        * Speed of querying
        * Delete records individually through API access (Driver of the DB)
    
    Mongo DB ==> Mongoose ==> Queries (certain syntax way of extracting and put data)

    ==> Database engine ==> It make sense of where the data we want is stored on the disk

    ==> sends us relevant data back

    * SQL vs NOSQL
        * SQL:
        * SQL = Structured Querying Language
        * Database engine = what data we want through SQL
        * Stored in RDBMS format (tables, rows, columns)
        * Vertically Scalable (1 single computer)
        * MySQL, Postgres
        * 
        * NoSQL:
        * It is usually not RDBMS
        * NoSQL = {"key": "value", "key2", "value2"}
        * Horizontally scalable
        * MongoDB, DynamoDB


    Database => Collection(s) => Collection => Document => JSON-like => key-value pairs

    mongoose => sits on top of mongo db native driver (mongodb) ====> provides rich developer experience

*/
