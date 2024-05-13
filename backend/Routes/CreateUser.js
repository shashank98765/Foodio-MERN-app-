const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const User = require("../models/User")

// For Encryption and Authorization
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "TrialAndErrorIsTheSteppingStonesToSuccess12345!@#$%"

//For Create User code
router.post("/createuser", [
    body('email', 'Wrong Syntax').isEmail(),
    body('name', 'Name is too short').isLength({ min: 5 }),
    body('password', 'Password is too short').isLength({ min: 5 })
]
    ,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt= await bcrypt.genSalt(10);
        let securePassword =await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: true });

        }

    })


// For Login User code
router.post("/loginuser", [
    body('email', 'Wrong Syntax').isEmail(),
    body('password', 'Password is too short').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
            }

            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken =jwt.sign(data, jwtSecret)
            
            return res.json({ success: true,authToken: authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: true });

        }

    })

module.exports = router