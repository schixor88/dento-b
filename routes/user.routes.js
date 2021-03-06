const router = require('express').Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
//middlewares
const { roleControl } = require('../middleware/rolecontrol.middleware');
const role = require('../static/roles.static');


// verification

router.get("/get-user-details", roleControl(role.user), async(req, res)=>{
    try {

        const {user_id} = req.body
        const user = await pool.query("SELECT user_id, user_email, user_name FROM users WHERE user_id = $1",[user_id])
        res.json(user.rows[0])
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})



module.exports = router;