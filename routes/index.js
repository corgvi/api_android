var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {Schema} = require("mongoose");
const e = require("express");
const uri = "mongodb+srv://cuongvv205:cuong2001@cluster0.7wznx06.mongodb.net/api_mob403?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log('co loi xay ra'));

const truyenSchema = new Schema({
  ten_truyen: String,
  mo_ta: String,
  ten_tac_gia: String,
  nam_xuat_ban: String,
  anh_bia: String,
  danh_sach_truyen: Array
}, {timestamps: true})

const commentSchema = new Schema({
  id_truyen: String,
  id_user: String,
  noi_dung: String,
}, {timestamps: true})

const userSchema = new Schema({
  user_name: String,
  password: String,
  email: String,
  full_name:String
}, {timestamps: true})

const truyenModel = mongoose.model('truyens', truyenSchema)
const commentModel = mongoose.model('comments', commentSchema)
const userModel = mongoose.model('users', userSchema)

router.get('/', function (req, res, next) {

  truyenModel.find({}, function (error, result) {
    if (error) throw error;
    console.log(result.length)
    res.send(result)
  })
});

router.post('/createTruyen', async function (req, res) {
  const id = req.body.id;
  const ten_truyen = req.body.ten_truyen;
  const mo_ta = req.body.mo_ta;
  const ten_tac_gia = req.body.ten_tac_gia;
  const nam_san_xuat = req.body.nam_san_xuat;
  const anh_bia = req.body.anh_bia;
  const danh_sach_truyen = req.body.danh_sach_truyen

  var item = new truyenModel({
    ten_truyen: ten_truyen,
    mo_ta: mo_ta,
    ten_tac_gia: ten_tac_gia,
    nam_san_xuat: nam_san_xuat,
    anh_bia: anh_bia,
    danh_sach_truyen: danh_sach_truyen
  })

  await item.save();

  truyenModel.find({}, function (error, result) {
    if (error) throw error;
    console.log(result.length)
    res.send(result)
  })
})

router.get('/getTruyens', function (req, res) {
  const itemList = mongoose.model('truyens', truyenSchema);

  itemList.find({}, function (error, result) {
    if(error){
      console.log(error)
    }
    res.send(result);
  })
})

router.post('/createComment', async function (req, res) {
  const id = req.body.id;
  const id_truyen = req.body.id_truyen;
  const id_user = req.body.id_user;
  const noi_dung = req.body.noi_dung;

  var item = new commentModel({
    id_truyen: id_truyen,
    id_user: id_user,
    noi_dung: noi_dung,
  })

  await item.save();

  commentModel.find({}, function (error, result) {
    if (error) throw error;
    console.log(result.length)
    res.send(result)
  })
})

router.get('/getComments', function (req, res) {
  const itemList = mongoose.model('comments', commentSchema);

  itemList.find({}, function (error, result) {
    if(error){
      console.log(error)
    }
    res.send(result);
  })
})

router.post('/createUser', async function (req, res) {
  const id = req.body.id;
  const user_name = req.body.user_name;
  const password = req.body.password;
  const email = req.body.email;
  const full_name = req.body.full_name;

  var item = new userModel({
    user_name: user_name,
    password: password,
    email: email,
    full_name: full_name,
  })

  await item.save();

  userModel.find({}, function (error, result) {
    if (error) throw error;
    console.log(result.length)
    res.send(result)
  })
})

router.get('/getUsers', function (req, res) {
  const itemList = mongoose.model('users', userSchema);

  itemList.find({}, function (error, result) {
    if(error){
      console.log(error)
    }
    res.send(result);
  })
})

module.exports = router;
