const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 


dotenv.config(); 

const bodyParser = require('body-parser');

const UserRoutes = require('./routes/userRoutes')

const ConnectDb = require('./conection/config')

const app = express();

const port = process.env.PORT || 8000

app.use(express.json());
app.use(cors());
app.use('/user', UserRoutes)

const todoRouter = require('./routes/tasks');
app.use('/api/tasks', todoRouter);

app.use(bodyParser.json());

ConnectDb();

app.listen(port, () => {
  console.log(`server is started on: ${port}`)
})

