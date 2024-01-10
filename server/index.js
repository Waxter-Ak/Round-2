const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");

//Configuring Env Variables
dotenv.config();

// Connecting to database
connectDatabase();


const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));