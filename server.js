const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./contract/user.values')

app.use(express.json()) //req.body
app.use(cors())


//ROUTES//

//register and login
app.use("/auth", require("./routes/auth.routes"));

app.use("/user", require("./routes/user.routes"));


app.listen(5000, ()=>{
    console.log("-- server running on 5000")
})