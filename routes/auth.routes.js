const router = require('express').Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
//middlewares
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo.middleware");
const { roleControl } = require('../middleware/rolecontrol.middleware');
const role = require('../static/roles.static');


//authentication

// -- register user X
// -- login user X
// -- convert user to admin/mod by admin X
// -- convert mod/admin to user by mod X
// -- delete user by admin
// -- get all users by role
// -- edit user name, email, phone by admin

//register a new user as 'user'

router.post("/register", validInfo, async (req, res) => {
    try {

        //1. de-struct the req.body
        const { name, email, password } = req.body;
        //2. check if user exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length !== 0) {
            return res.status(401).send("User Already Exists!")
        }
        //3. bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)
        //4. enter the user to db
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );


        //5. generating out jwt token
        const token = jwtGenerator(newUser.rows[0].user_id, newUser.rows[0].user_role);

        res.json({
            token
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


//login the user or admin

router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destruct the req body
        const { email, password } = req.body
        //2. check if the user doesnt exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect")
        }
        //3. check if passwords match
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }
        //4. give jwt token

        const token = jwtGenerator(user.rows[0].user_id, user.rows[0].user_role);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//random test API

router.get("/testapi", roleControl(role.user), async(req, res)=>{
    res.status(300).send("Functional")
})


module.exports = router;