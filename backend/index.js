const express = require('express');
const connectToMongo = require('./db');
const PORT = process.env.SERVER_PORT || 8081;
const cors = require('cors');

connectToMongo();

const app = express();

// allow cors
app.use(cors());

// body parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to iNotebook</h1>');
})

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => {
    console.log('Server is started on http://localhost:' + PORT);
})