const mongoose = require('mongoose')

const peopleScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 15,
    minLength: 5
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default : ''
  },
  role:{
    type: String,
    enum:['admin','user'],
    default: 'user'               
  },
  
},{
   timestamps:true                 
  })

module.exports = peopleScema;