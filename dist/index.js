"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// const clinet = new Client({
//     host: 'ep-blue-flower-a5ty6a24.us-east-2.aws.neon.tech',
//     port: 4400,
//     database: 'test',
//     user: 'test_owner',
//     password: 'C5gUS1upMweB'
// })
//or 
const client = new pg_1.Client({
    connectionString: "postgresql://test_owner:C5gUS1upMweB@ep-blue-flower-a5ty6a24.us-east-2.aws.neon.tech/test?sslmode=require"
});
//create a table.
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        console.log('connected');
        const user = yield client.query(`
         CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255)  NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
        `);
        console.log(user);
    });
}
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
// async function insertaUser() {
//     try {
//         await client.connect(); // Ensure client connection is established
//         const insertQuery = `
//       INSERT INTO users (username, email, password)
//       VALUES ($1,$2,$3);
//     `;
//         const values = ['hari', 'hari@gmail.com', 'harik@132']
//         const res = await client.query(insertQuery, values);
//         console.log('Insertion success:', res); // Output insertion result
//     } catch (err) {
//         console.error('Error during the insertion:', err);
//     } finally {
//         await client.end(); // Close the client connection
//     }
// }
// insertaUser()
function getSingleUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        try {
            const sqlQuery = `SELECT * FROM users WHERE email = $1`;
            const values = [email];
            const res = yield client.query(sqlQuery, values);
            console.log('success', res.rows);
        }
        catch (e) {
            console.log(e);
        }
    });
}
getSingleUser("hari@gmail.com");
