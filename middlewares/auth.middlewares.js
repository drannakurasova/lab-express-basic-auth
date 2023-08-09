function isMyUserLoggedIn (req, res, next) {
    if (req.session.user === undefined) {
        //el usuario no esta logeado
        res.redirect("/auth/login")
    } else { 
    //el usuario esta activo
    next ()
}
}

function updateLocals(req,res,next) {
    if (req.session.user === undefined) {
        //crear un avariable local que indique que no esta logeado
        res.locals.isUserActive = false;
    } else {
        //si esta logeado
        res.locals.isUserActive = true;
    }

    next () //to continue with the routes
}

module.exports = {
    isMyUserLoggedIn: isMyUserLoggedIn,
    updateLocals: updateLocals
}