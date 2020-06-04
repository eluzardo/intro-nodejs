const express = require('express');
const bodyParser = require ('body-parser');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

dotenv.config();

const routesV1 = require('./routes/v1');

console.log('MONGO', process.env.MONGO);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`RUNNING ON ${PORT}`);
})
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log('connected to mongo');
})
.catch(error => {
    console.log('mongodb error', error);
});




