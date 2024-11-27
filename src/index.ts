import { Client } from "pg";

// const clinet = new Client({
//     host: 'ep-blue-flower-a5ty6a24.us-east-2.aws.neon.tech',
//     port: 4400,
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


//insert a entry
//Not correct for pg library security issues.
async function insertaUser() {
    try {
        await client.connect(); // Ensure client connection is established
        const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ('username2', 'user3@example.com', 'user_password');
    `;
        const res = await client.query(insertQuery);
        console.log('Insertion success:', res); // Output insertion result
    } catch (err) {
        console.error('Error during the insertion:', err);
    } finally {
        await client.end(); // Close the client connection
    }
}

insertaUser()