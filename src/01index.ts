import { Client } from "pg";

// const client = new Client({
//     host: 'ep-blue-flower-a5ty6a24.us-east-2.aws.neon.tech',
//     // port: 5334,
//     database: 'test',
//     user: 'test_owner',
//     password: 'C5gUS1upMweB'
// })
//or 

const client = new Client({
    connectionString: "postgresql://test_owner:C5gUS1upMweB@ep-blue-flower-a5ty6a24.us-east-2.aws.neon.tech/test?sslmode=require"
})


//create a table.
async function createUserTable() {
    await client.connect()
    console.log('connected')
    const user = await client.query(`
         CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255)  NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
        `)
    console.log(user)
}

// createUserTable()

//insert a entry
//Not correct for pg library security issues.
// async function insertaUser() {
//     try {
//         await client.connect(); // Ensure client connection is established
//         const insertQuery = `
//       INSERT INTO users (username, email, password)
//       VALUES ('username2', 'user3@example.com', 'user_password');
//     `;
//         const res = await client.query(insertQuery);
//         console.log('Insertion success:', res); // Output insertion result
//     } catch (err) {
//         console.error('Error during the insertion:', err);
//     } finally {
//         await client.end(); // Close the client connection
//     }
// }

//? Right Way

async function insertaUser() {
    try {
        await client.connect(); // Ensure client connection is established
        const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1,$2,$3);
    `;
        const values = ['hari', 'hari@gmail.com', 'harik@132']
        const res = await client.query(insertQuery, values);
        console.log('Insertion success:', res); // Output insertion result
    } catch (err) {
        console.error('Error during the insertion:', err);
    } finally {
        await client.end(); // Close the client connection
    }
}

// insertaUser()


//GET DATA
// async function getSingleUser(email: string) {
//     await client.connect();

//     try {
//         const sqlQuery = `SELECT * FROM users WHERE email = $1`
//         const values = [email];
//         const res = await client.query(sqlQuery, values)
//         console.log('success', res.rows) //-GET ALL THE MATCHED DATA
//         // console.log('success', res.rows[0]) //-GET SINGLE MATCHED
//     } catch (e) {
//         console.log(e)
//     }
// }
// getSingleUser("hari@gmail.com");


//-UPDATE
async function getSingleUpdateUser(email: string, name: string) {
    await client.connect();

    try {
        const sqlQuery = `
            UPDATE users
            SET username = $1
            WHERE email = $2
            RETURNING *;`; // Use RETURNING to get the updated row(s)

        const values = [name, email]; // Provide both name and email
        const res = await client.query(sqlQuery, values);

        console.log('success', res.rows); // Get all matched data
        // console.log('success', res.rows[0]); // Uncomment to get single matched row
    } catch (e) {
        console.log(e);
    } finally {
        await client.end(); // Ensure the client disconnects after operation
    }
}

getSingleUpdateUser("hari@gmail.com", "H");


//join

// SELECT *
// FROM user
// JOIN address on user.id = address.user_id
// WHERE user.id = $1