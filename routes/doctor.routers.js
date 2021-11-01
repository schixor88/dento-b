const router = require('express').Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
//middlewares
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo.middleware");
const { roleControl } = require('../middleware/rolecontrol.middleware');
const role = require('../static/roles.static');


router.post("/assign-patient", roleControl(role.mod), async (req, res) => {
    try {

        //1. de-struct the req.body
        const { patient_id, doctor_id} = req.body;
        //
        
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;