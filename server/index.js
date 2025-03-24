const express = require('express');
const cors = require('cors'); // If needed
const curry = require('./models/currymodels');
const app = express();
const db = require('./db.js');
const curriesRoute = require('./routes/curriesRoute');
const userRoute = require('./routes/userRoute');
app.use(cors());
app.use(express.json())
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello from Food app Backend!');
});

app.use('/api/curries/', curriesRoute);
app.use('/api/users', userRoute); // Fixed the typo

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});