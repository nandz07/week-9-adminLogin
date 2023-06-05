const User = require('../models/users');


async function login(req, res) {
  try {
    if (req.session.logedIn) {
      res.redirect('/');
    } else {
      res.render('user/login', { title: "Login System" });
    }
  } catch (error) {
    res.status(500).send("An error occurred");
  }
}
// ------------ test
async function sum(req,res){
  try{
    let num1=req.query.num1
    let num2=req.query.num2
    let sum=num1+num2
    res.render('/sum',{sum:sum})
  }catch(error){
    console.log(error)
  }
}
// ------------ test

async function loginPost(req, res) {
  try {
    if (req.session.logedIn) {
      res.redirect('/');
    } else {
      const email = req.body.email
      const password = req.body.password
      console.log(req.password);
      console.log(req.email);
      const dbData = await User.findOne({ email: email })
      console.log('dbData ' + dbData);

      if (dbData) {
        const passwordMatch = password === dbData.password
        if (passwordMatch) {
          req.session.user = email
          req.session.logedIn = true
          res.redirect('/')
        } else {
          res.render('user/login', { message: "password incorrect" });
        }
      } else {
        res.render('user/login', { message: "email or password incorrect !" });
      }
    }

  } catch (error) {
    console.log(error.message);
  }
}

async function signupGet(req, res) {
  try {
    if (req.session.logedIn) {
      res.redirect('/')
    } else {
      res.render('user/signUp', { title: "Signup" })
    }
  } catch (err) {
    res.status(500).send('an error occoured')
  }
}

async function signupPost(req, res) {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const dbData = await User.findOne({ email: email })
    if (dbData) {
      res.render('user/signUp', { message: "This email is already taken..!" });
    } else {
      const user = new User({
        name: name,
        email: email,
        password: password
      })
      const saveUser = await user.save()
      res.redirect('/login')
    }

  } catch (error) {
    res.json({ message: error.message, type: 'danger' });
  }
}


const homeGet = (req, res) => {
  try {
    if (req.session.user) {
      res.render('user/home', { user: req.session.user })
    } else {
      res.redirect('/login')
    }
  } catch (error) {
    console.log(error);
  }
}

const logoutGet = (req, res) => {
  try {
    //   req.session.destroy(function(err){
    //     if(err){
    //         console.log(err);
    //         res.send('Error')
    //     }else{
    //         res.redirect('/')
    //     }
    // })
    req.session.user = ''
    req.session.logedIn = false
    res.redirect('/login')
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  login,
  loginPost,
  signupGet,
  signupPost,
  homeGet,
  logoutGet
};
