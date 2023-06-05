const User = require('../models/users')

const dbAdmin = {
    email: "admin@gmail.com",
    password: "123"
}

async function adminLoginGet(req, res) {
    try {
        console.log(req.session.adminLogedIn);
        if (req.session.adminLogedIn) {
            res.redirect('/admin');
        } else {
            res.render('admin/login', { title: "Login System" });
        }
    } catch (error) {
        console.log(error);
    }
}
async function adminLoginPost(req, res) {
    try {
        if (req.session.adminLogedIn) {
            res.redirect('/admin');
        } else {
            console.log('in admin');
            const email = req.body.email
            const password = req.body.password
            console.log(req.body.password);
            console.log(req.body.email);
            console.log(req.body.email);
            // const dbData = await User.findOne({ email: email })
            const dbData = (email === dbAdmin.email)
            console.log('dbData ' + dbData);

            if (dbData) {
                const passwordMatch = password === dbAdmin.password
                if (passwordMatch) {
                    req.session.admin = email
                    req.session.adminLogedIn = true
                    res.redirect('/admin')
                } else {
                    res.render('admin/login', { message: "password incorrect" });
                }
            } else {
                res.render('admin/login', { message: "email or password incorrect !" });
            }
        }

    } catch (error) {

    }
}
async function adminHome(req, res) {
    try {
        if (req.session.adminLogedIn) {
            const users = await User.find().exec();
            res.render('admin/index', {
                title: 'Home Page',
                users: users,
                message: req.session.admin,
            })
        } else {
            res.redirect('/admin/login')
        }

    } catch (error) {
        console.log(error);
    }
}
async function adminAddGet(req, res) {
    try {
        res.render('admin/add_user', { title: `add users` })
    } catch (error) {
        console.log(error);
    }
}
async function adminAddPost(req, res) {
    try {
        console.log('hia');
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        console.log(name);
        console.log(email);
        console.log(password);

        const dbData = await User.findOne({ email: email })
        if (dbData) {
            res.render('admin/add_user', { message: "This email is already taken..!", title: 'add user' });
        } else {
            const user = new User({
                name: name,
                email: email,
                password: password
            })
            const saveUser = await user.save()
            res.redirect('/admin')
        }

    } catch (error) {
        console.log(error);
    }
}
async function adminEditGet(req, res) {
    try {
        const id = req.params.id
        const user = await User.findById(id).exec()
        if (user) {
            res.render('admin/edit_user', {
                title: 'Edit User',
                user: user
            })
        } else {
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error);
    }
}
async function adminEditPost(req, res) {
    try {
        const id = req.params.id;
        const email = req.body.email
        const dbData = await User.findOne({ email: email })
        if (dbData) {
            const user = await User.findById(id).exec()
            if (user.email != email) {
                res.render('admin/edit_user', {
                    message: "This email is already taken..!",
                    title: 'Edit User',
                    user: user
                });
            } else {
                await User.findByIdAndUpdate(id, {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }).exec();

                req.session.message = {
                    type: 'success',
                    message: 'User updated successfully'
                };

                res.redirect('/admin');
            }
        } else {
            await User.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).exec();

            req.session.message = {
                type: 'success',
                message: 'User updated successfully'
            };

            res.redirect('/admin');
        }

    } catch (error) {
        console.log(error);
    }
}

async function adminDeletePost(req, res) {
    try {
        const id = req.params.id
        const result = await User.findByIdAndRemove(id).exec()
        req.session.message = {
            type: 'info',
            message: 'user deleted successfully'
        }
        res.redirect('/admin')
    } catch (error) {
        console.log(error);
    }
}
const logoutGet = (req, res) => {
    try {
        req.session.admin = ''
        req.session.adminLogedIn = false
        res.redirect('/admin/login')
        // req.session.destroy(function (err) {
        //     if (err) {
        //         console.log(err);
        //         res.send('Error')
        //     } else {
        //         res.redirect('/admin/login')
        //     }
        // })
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    adminLoginGet,
    adminLoginPost,
    adminHome,
    adminAddGet,
    adminAddPost,
    adminEditGet,
    adminEditPost,
    adminDeletePost,
    logoutGet
}