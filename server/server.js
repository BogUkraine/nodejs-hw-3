const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const process = require('process');
const morgan = require('morgan');

const app = express();
const PORT = config.get('port') || 5000;

app.use(morgan('combined'));
app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/trucks', require('./routes/trucks.routes'));
app.use('/api/loads', require('./routes/loads.routes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Server is ready on port ${PORT}`);
    });
  } catch (error) {
    console.log('Server has not started :(', error);
    process.exit(0);
  }
}

start();

/*
1. how to set photo;
2. how to link truck/user;
3. assigned to type of field (truck);
5. who can use truck;
6. Can driver create more than 1 type of each vehicle;
7. how i need to control load status?
8. Logging of requsts. || DEBUG /
9. how to accept delete all, put all. Which role of authoriation?
10. Do I need to validate id?
11.
When change document, do I need to create new
 instance of model or simple rewrite fields?
*/
