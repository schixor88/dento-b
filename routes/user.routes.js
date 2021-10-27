const router = require('express').Router()
const pool = require("../db");
//middlewares
const authorization = require("../middleware/authorization.middleware");
const { roleControl } = require('../middleware/rolecontrol.middleware');
const { use } = require('./jwtAuth');

// verificatuin

router.get("/getUserDetails", authorization, async(req, res)=>{
    try {

        // res.json(req.user);
        const user = await pool.query("SELECT user_id, user_email, user_name FROM users WHERE user_id = $1",[req.user])
        res.json(user.rows[0])
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

router.get("/g", roleControl('user'), async(req, res)=>{
    try{

        const user = await pool.query("Select * from users where user_role = 'user'")
        res.json(user.rows)

    }catch(err){
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

module.exports = router;