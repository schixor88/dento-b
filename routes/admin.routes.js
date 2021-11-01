const router = require('express').Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
//middlewares
const { roleControl } = require('../middleware/rolecontrol.middleware');
const role = require('../static/roles.static');
const { user } = require('../static/roles.static');

// get All users by 'user_role' as admin/user/mod/docs

router.post("/get-all-users", roleControl(role.admin), async (req, res) => {
    try {

        //destruct
        const { user_role } = req.body
        // get all users where role is 
        var users = null
        if(user_role == "all" || !user_role){
            users = await (await pool.query("SELECT * from users")).rows;
        }else{
        users = await (await pool.query("SELECT * from users WHERE user_role = $1", [user_role])).rows;
        }
        
        if (users == null || users == "") {
            return res.status(401).json({ "msg": "sorry no users found" })
        }

        res.json(users)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})


// use a admin token to promote and demote any user to admin/mod

router.post("/change-user-role", roleControl(role.admin), async (req, res) => {
    try {

        const { user_id, role_to } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (user.rows.length == 0) {
            return res.status(401).json({ "message": "User Not Found!" })
        }
        const updatedUser = await pool.query("UPDATE users SET user_role = $2 WHERE user_id = $1", [user_id, role_to]);

        res.json({
            "msg": "user updated"
        })


    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})


// delete a user

router.post("/delete-user", roleControl(role.admin), async (req, res) => {
    try {

        const { user_id } = req.body
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (user.rows.length == 0) {
            return res.status(401).json({ "message": "User Not Found!" })
        }
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id= $1 ", [user_id]);

        res.json({
            "msg": "user deleted"
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})




module.exports = router;