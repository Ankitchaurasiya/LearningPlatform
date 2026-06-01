import { query } from './db.js';



try {
    const result = await query(`
      SELECT rolname
  FROM pg_roles
  ORDER BY rolname;
`);

console.log(result.rows);
} catch (error) {
    console.error("error: ", error)
}


// import { client, connectDB } from './db.js';

// try {
//   await connectDB();

//   const result = await client.query(`
//     SELECT rolname
//     FROM pg_roles
//     ORDER BY rolname;
//   `);

//   console.log(result.rows);
// } catch (err) {
//   console.error('Database error:', err);
// } finally {
//   await client.end();
// }