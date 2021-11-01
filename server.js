const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()) //req.body
app.use(cors())

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");


//ROUTES//

//USER AUTHENTICATIONS
//-- login
//-- signup
//-- forgot password
app.use("/auth", require("./routes/auth.routes"));

//ADMIN ACCESS CONTROL
//-- promote user to admin/mod
//-- demote admin/mod to user
//-- delete a user

app.use("/admin", require("./routes/admin.routes"));


//USER FUNCTIONS
//-- see user details
//-- edit user details

app.use("/user", require("./routes/user.routes"));





app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  ); 



app.listen(process.env.port, ()=>{
    console.log(`-- server running on ${process.env.port}`)
})