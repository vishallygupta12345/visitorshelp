import mongoose from "mongoose";

import { MongoMemoryServer } from 'mongodb-memory-server';

import ENV from '../config.js';


async function connect2(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true);
    const db2 = mongoose.createConnection(ENV.ATLAS_URI2);
    console.log("Database2 Connected");
    return db2;
}

export default connect2;