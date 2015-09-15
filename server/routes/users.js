var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var User = require('../models/user.js');

router.get('/users', function(req, res, next) {
  User.findQ()
    .then(function (result) { res.json(result);})
    .catch(function (err) {res.send(err);})
    .done();
});

//// Write the rest of this Crud app using promises instead of callbacks.

router.post('/users', function(req, res, next) {
 var user =  new User({username: req.body.name})
    .saveQ()
      .then(function(result) {res.json(result);})
      .catch(function(err) {res.send(err);})
      .done();
});

router.get('/user/:id', function(req, res, next) {
  User.findByIdQ(req.params.id)
    .then(function(data) {res.json(data);})
    .catch(function(err) {res.json({'message': err});})
    .done();
});

router.put('/user/:id', function(req, res, next) {
  var update = {username: req.body.name};
  User.findByIdAndUpdateQ(req.params.id, update)
    .then(function(data) {res.json(data);})
    .catch(function(err) {res.json({'message': err});})
    .done();
});

router.delete('/user/:id', function(req, res, next) {
  User.findByIdAndRemoveQ(req.params.id)
    .then(function(data) {res.json(data);})
    .catch(function(err) {res.json({'message': err});})
    .done();
});

module.exports = router;
