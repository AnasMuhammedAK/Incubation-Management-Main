const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const ApplicationSchema = require('../models/applicationModel')
const { response } = require('express')

//    Register new user

const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password } = req.body
  console.log("🚀 ~ file: user-helpers.js ~ line 10 ~ registerUser ~ req.body", req.body)
  console.log(req.body)

  if (!fname || !email || !password || !lname) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
  })

  if (user) {
    user.token = generateToken(user._id)
    res.status(201).json({
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//   Authenticate a user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  if (!email || !password) {
    res.status(400).json({ error: "please fill all fields" })
  }
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = generateToken(user._id)
    res.status(201).json({
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      block: user.block,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//    Get user data


const addApplication = asyncHandler(async (req, res) => {

  console.log("🚀 ~ file: user-helpers.js ~ line 87 ~ addApplication ~ req.body", req.body)
  const apps = await ApplicationSchema.create(req.body)
  res.status(200).json(apps)
})

const getmyform = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  try {
    await ApplicationSchema.findOne({ User: req.params.id }).then((response) => {
      
      //console.log("🚀 ~ file: user-helpers.js ~ line 97 ~ awaitApplicationSchema.findById ~ status", response.Status)
      if(response !== null){
        res.status(200).json(response.Status)
      }else{
        res.status(200).json(null)
      }
     
    })
  } catch (error) {
    console.log("🚀 ~ file: user-helpers.js ~ line 101 ~ getmyform ~ error", error)

  }
})
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  
  addApplication,
  getmyform
}
