import mongoose from "mongoose";

import { MongoMemoryServer } from 'mongodb-memory-server';

import ENV from '../config.js';


async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    //const uri = process.env.ATLAS_URI


    mongoose.set('strictQuery', true);
    const db = mongoose.createConnection(process.env.ATLAS_URI || ENV.ATLAS_URI);
    console.log("Database Connected");
    return db;
}

export default connect;