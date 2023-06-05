const express=require('express')
const router=express.Router()
const adminController=require('../controllers/adminController')

// get
router.get('/login', adminController.adminLoginGet)
router.get('/', adminController.adminHome)
router.get('/add', adminController.adminAddGet)
router.get('/edit/:id', adminController.adminEditGet)
router.get('/delete/:id', adminController.adminDeletePost)
router.get('/logout', adminController.logoutGet)
// post
router.post('/login', adminController.adminLoginPost)
router.post('/add', adminController.adminAddPost)
router.post('/edit/:id', adminController.adminEditPost)

module.exports=router