import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connect from './database/conn.js';
import connect2 from './database/conn2.js';
import router from './router/route.js';

const app = express();


// middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin: ["http://localhost:1111", "http://localhost:2222","https://help-backend.onrender.com","https://help-backend-test.onrender.com", "https://help-frontend1.onrender.com", "https://help-frontend1-test.onrender.com", "http://localhost:3000", "http://localhost:3001"],
}
));
app.use(morgan('tiny'));
app.disable('x-powered-by');



const PORT = process.env.PORT || 2222;


// HTTP GET request
app.get('/', (req,res) => {
    res.status(201).json('Home GET Request');
});


// api Routes
app.use('/api', router)


// start server only when we have valid connection
connect().then( () => {
    connect2().then(() => {
        try {
            app.listen(PORT, () => {
                console.log(`Server connected to http://localhost:${PORT}`);
            })
        } catch (error) {
            console.log('Cannot connect to the server');
        }
    }).catch(error =>  {
        console.log('Invalid database2 connection !!!');  
    })
}).catch(error =>  {
    console.log('Invalid database connection !!!');
})
