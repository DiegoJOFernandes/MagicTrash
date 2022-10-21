function adminAuth(req, res, next){
  if(req.session.user != undefined){
    next()
  }else{
    // User.findOne({where:{email: email}}).then(user => {
  //   res.render('home', {info: info})
  // })
    console.log(`MIDDLEWARE: ${req.session.user}`)
    res.redirect("/")
  }
}

module.exports = adminAuth