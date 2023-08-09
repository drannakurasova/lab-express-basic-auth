const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

// const {isMyUserLoggedIn} = require("../middlewares/auth.middlewares.js") // { } to destructurialise bcz it´s coming from a different archive and folder


// router.get ("/user", isMyUserLoggedIn, (req,res,next) => {

    router.get ("/user", (req,res,next) => {
        console.log ("req session", req.session.user)


    User.findById(req.session.user._id)
    .then ( (response) => {
    res.render("auth/user.hbs", {
        user: response
    })
    } )
    .catch ( (error) => { 
        next (error)
    } )

})

module.exports = router;