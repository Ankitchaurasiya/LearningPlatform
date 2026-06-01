import {Pool} from 'pg';

const pool = new Pool({
    user: "postgres",
    database: "node_test",
    host: "localhost",
    port: 5432
});

pool.on('connect', () => {
    console.log("pg db connected");
})
pool.on('error', (err) => {
    console.error("DB connection failed: ", err);
})

export const query = async (text, params = []) => {
    const client = await pool.connect();
    try {
        const res = client.query(text, params);
        return res;
    } catch (error) {
        console.error("pg query error: ", error);
    } finally {
        client.release();
    }
}

// import {Client} from 'pg';

// const client = new Client({
//     user:"postgres",
//     database:"node_test",
//     host:"localhost",
//     port:5432
// });

// client.on('error', (err)=> {
//     console.error("pg connection error: " + err);
// })
// client.on('end', () => {
//     console.log("pg disconnected");
// })

// export async function connectDB() {
//     await client.connect();
// }

// client.on('connect', ()=>{
//     console.log("pg connect success");
// })

// export {client};

// import { Client } from 'pg';

// const client = new Client({
//   user: 'postgres',
//   database: 'node_test', // or your database name
//   host: 'localhost',
//   port: 5432,
// });

// client.on('error', (err) => {
//   console.error('Postgres error:', err);
// });

// client.on('end', () => {
//   console.log('Postgres disconnected');
// });

// export async function connectDB() {
//   await client.connect();
//   console.log('Postgres connected');
// }

// export {client};