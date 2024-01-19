const express = require('express');
const app = express();
const user_route = require("./routes/users")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",user_route);



const port = process.env.PORT || '3000'
const endpoints = '1.120'
app.listen(port,`192.168.${endpoints}`, () => {

    console.log(`Server listening  at http://192.168.${endpoints}:${port}`)
})