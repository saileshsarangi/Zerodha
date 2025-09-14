const express = require('express')
const {signup,login,logout} =  require("../controllers/user.controller")
const { body } = require('express-validator');
const router = express.Router();
router.post('/signup',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').optional().matches(/^\d{10}$/).withMessage('Phone must be a 10-digit number')
  ],signup)

router.post('/login' ,[
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],login)

router.post('/orders',(req,res)=>{})

router.get('/depth',(req,res)=>{})

router.get('/balance',(req,res)=>{})

module.exports = router