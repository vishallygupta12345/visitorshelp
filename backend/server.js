import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connect from './database/conn.js';
import router from './router/route.js';

const app = express();


// middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const PORT = process.env.PORT || 1111;


// HTTP GET request
app.get('/', (req,res) => {
    res.status(201).json('Home GET Request');
});


// api Routes
app.use('/api', router)


// start server only when we have valid connection
connect().then( () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error =>  {
    console.log('Invalid database connection !!!');
})
