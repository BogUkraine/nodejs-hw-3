const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/trucks', require('./routes/trucks.routes'));

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => console.log(`Server is ready on port ${PORT}`))
    }
    catch (error) {
        console.log('Server has not started :(', error);
        process.exit(0);
    }
}

start();

/*
1. how to set photo;
2. how to link truck/user;
3. assigned to type of field (truck);
4. get req with req.query or post req;
5. who can use truck;
6. Can driver create more than 1 type of each vehicle;
7. how i need to control load status?
*/