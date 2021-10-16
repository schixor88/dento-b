const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()) //req.body
app.use(cors())


//ROUTES//

//register and login
app.use("/auth", require("./routes/jwtAuth"));




app.listen(5000, ()=>{
    console.log("-- server running on 5000")
})