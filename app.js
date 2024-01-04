const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/messages');
const cors = require('cors');
const checkFirebaseToken = require('./middleware/checkFirebaseToken')


const app = express();

app.use(cors({origin : '*'}))
app.use(checkFirebaseToken)
app.use(bodyParser.json());
app.use('/user',userRouter)
app.use('/messages',messageRouter)


module.exports = app;