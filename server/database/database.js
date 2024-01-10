const { connect, set } = require("mongoose");

const connectDatabase = () => {
    set('strictQuery', false);
    connect(process.env.DB_URL)
        .then(() => console.log("Database connected"))
        .catch(error => console.log(error));
};

module.exports = connectDatabase;
