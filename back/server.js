const app = require('express')();
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB()
app.use(require('express').json())
app.use(require('express').urlencoded({extended: false}))
app.use('/api', require('./routes/userRoutes'))
app.listen(port, () => {
    console.log(`listening on *:${port}`);
});
