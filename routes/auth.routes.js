//ITER 1 Step 1. CREATING AUTH.ROUTES AND CONNECTING IT
const express = require("express");
const router = express.Router();

// ITER 1 STEP 4 ENCRYPTION
const bcrypt = require ("bcrypt")

const User = require("../models/User.model.js")
//ITER 1 STEP 2 //GET to "/signup" renderizamos la vista de signup form
router.get ("/signup", (req,res,next)=> {
    res.render("auth/signup.hbs")
    console.log ("rendering signup")
})

//ITER 1 STEP 3. //POST "/signup" to let a new user to register and after be redirected or receive a message

router.post ("/signup", async (req,res,next) => {
    //to make sure a user fills in the fields
    console.log ("post signup collecting form´s info", req.body)
    const {username, password} = req.body;

    // condicion de guardia, everything is filled in
    if (username === "" || password === "") {
        res.status(400).render ("auth/signup.hbs", {
            errorMessage: "Don´t be shy, fill them in"
        }) 
        return;
    }
    //to check if password includes all the necessary, using regexr.com
    //? where to find it there
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

    //method TEST to check the password
    if (regexPassword.test(password) === false) {
        res.status(400).render("auth/signup.hbs", {
            errorMessage: "Are you sure about this password?"
        })
        return;
    }
    //to make sure this user doesnt exist
    try {
        const foundUser = await User.findOne({username:username})
        if ( foundUser !== null ) {
            res.status(400).render("auth/signup.hbs", {
                errorMessage: "Have we met before? Try logging in"
            })     
            return;
        }

    const salt = await bcrypt.genSalt (10);
    const passwordHash = await bcrypt.hash(password, salt)
    console.log ("hashed password", passwordHash)
     await User.create({
        username:username,
        password:passwordHash
     })
    //  console.log("new user", username, password)
    res.redirect ("/auth/login")
 } catch (error) 
 {next (error)} 
  } )    
  

//ITER 2. STEP 1. //GET to "/login" to render a login page
router.get ("/login", (req,res,next) => {
    res.render ("auth/login.hbs")
})

router.post ("/login", async (req,res,next) => {
const {username, password} = req.body
console.log ("req.body", req.body)
//looking for a user with this username
    try {
        const weFoundThisUser = await User.findOne ({username: username})

        if (weFoundThisUser === null) {
            res.status(400).render("auth/login.hbs", {
                errorMessage: "Nope, we haven´t met before. Please introduce yourself"
            })
            return;
        }

        //checking if their password is good
        const isThisPasswordOk = await bcrypt.compare (password, weFoundThisUser.password)
        if (isThisPasswordOk === false) {
            res.status(400).render("auth/login.hbs", {
                errorMessage: "This password won´t pass. Try again"
            })
            return;
        }
        req.session.thisUser = { 
            _id: weFoundThisUser._id,
            username: weFoundThisUser.username
        }

        req.session.save (() => {
            res.redirect("/user")
        } )

    
} catch (error) {
     next (error)
    
}
})




module.exports=router