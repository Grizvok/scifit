var express = require('express');
var router = express.Router();
var conString = 'postgres://postgres:grizvok5@localhost:5432/scifit';
var pg = require('pg');
var Promise = require('bluebird');
var _ = require('underscore');
var knex = require('./knex');

router.get('/chestdata', function(req, res) {
  var limit = req.query.paramOne;
  knex.select('chest').select('date').from('clients.chest').where('user_id', req.session.user).orderBy('date', 'desc').limit(limit)
  .then(function(rows) {
    rows.reverse();
    res.send(rows);
   })
 });

router.get('/bicepdata', function(req, res) {
  knex.select('bicep').select('date').from('clients.bicep').where('user_id', req.session.user).orderBy('date', 'desc').limit(30)
  .then(function(rows) {
    rows.reverse();
    res.send(rows);
   })
});

router.get('/waistdata', function(req, res) {
  knex.select('waist').select('date').from('clients.waist').where('user_id', req.session.user).orderBy('date', 'desc').limit(30)
  .then(function(rows) {
    rows.reverse();
    res.send(rows);
   })
});

router.get('/hipdata', function(req, res) {
  knex.select('hip').select('date').from('clients.hip').where('user_id', req.session.user).orderBy('date', 'desc').limit(30)
  .then(function(rows) {
    rows.reverse();
    res.send(rows);
   })
});

router.get('/thighdata', function(req, res) {
  knex.select('thigh').select('date').from('clients.thigh').where('user_id', req.session.user).orderBy('date', 'desc').limit(30)
  .then(function(rows) {
    rows.reverse();
    res.send(rows);
   })
});

router.get('/', function(req, res) {
  if(!req.session.user) {
    res.redirect('dasherror');
  } else if (req.session.user) {
  var user = req.session.user;
  var userObj = {};

Promise.all([
    knex.select('chest', 'date').from('clients.chest').where('user_id', req.session.user).orderBy('date', 'desc').limit(1),
    knex.select('bicep', 'date').from('clients.bicep').where('user_id', req.session.user).orderBy('date', 'desc').limit(1),
    knex.select('waist', 'date').from('clients.waist').where('user_id', req.session.user).orderBy('date', 'desc').limit(1),
    knex.select('hip', 'date').from('clients.hip').where('user_id', req.session.user).orderBy('date', 'desc').limit(1),
    knex.select('thigh', 'date').from('clients.thigh').where('user_id', req.session.user).orderBy('date', 'desc').limit(1)

]).spread(function(chestCirc, bicepCirc, waistCirc, hipCirc, thighCirc) {
    //prepare data as you need them
    if (chestCirc.length === 0) {
      userObj.chest = '';
    } else if (chestCirc.length ===1) {
      userObj.chest = chestCirc[0].chest;
    }
    if (bicepCirc.length === 0) {
      userObj.bicep = '';
    } else if (bicepCirc.length === 1) {
      userObj.bicep = bicepCirc[0].bicep;
    }
    if (waistCirc.length === 0) {
      userObj.waist = '';
        } else if (waistCirc.length === 1) {
      userObj.waist = waistCirc[0].waist;
    }
    if (hipCirc.length === 0) {
      userObj.hip = '';
    } else if (hipCirc.length === 1) {
      userObj.hip = hipCirc[0].hip;

    }
    if (thighCirc.length === 0) {
      userObj.thigh = '';
    } else if (thighCirc.length === 1) {
      userObj.thigh = thighCirc[0].thigh;
    }

    userObj.getTotalInches = function() {
      return this.chest + this.bicep + this.waist + this.hip + this.thigh;
    }

    res.render('dashboard', { 
      chest: userObj.chest, 
      bicep: userObj.bicep, 
      waist: userObj.waist,
      hip: userObj.hip,
      thigh: userObj.thigh,
      user: user,
      styles: '<link rel="stylesheet" type="text/css" href="/dashboard.css">'

    });
   });
  }
});

router.post('/chest', function(req, res) {
  var measurement = Number(req.body.chest);
  var user = req.session.user;
  var date = new Date();
if (measurement > 15 && measurement < 120) {
knex('clients.chest').insert({user_id: user, chest: measurement, date: new Date()}).then(function(data) {
  return data;
     });
    }
    res.end();
});

router.post('/bicep', function(req, res) {
  var measurement = Number(req.body.bicep);
  var user = req.session.user;
  var date = new Date();
if (measurement > 5 && measurement < 30) {
knex('clients.bicep').insert({user_id: user, bicep: measurement, date: new Date()}).then(function(data) {
  return data;
     });
    }
    res.end();
});

router.post('/waist', function(req, res) {
  var measurement = Number(req.body.waist);
  var user = req.session.user;
  var date = new Date();
if (measurement > 10 && measurement < 70) {
knex('clients.waist').insert({user_id: user, waist: measurement, date: new Date()}).then(function(data) {
  return data;
     });
    }
    res.end();
});

router.post('/hip', function(req, res) {
  var measurement = Number(req.body.hip);
  var user = req.session.user;
  var date = new Date();
if (measurement > 10 && measurement < 100) {
knex('clients.hip').insert({user_id: user, hip: measurement, date: new Date()}).then(function(data) {
  return data;
     });
    }
    res.end();
});

router.post('/thigh', function(req, res) {
  var measurement = Number(req.body.thigh);
  var user = req.session.user;
  var date = new Date();
if (measurement > 3 && measurement < 60) {
knex('clients.thigh').insert({user_id: user, thigh: measurement, date: new Date()}).then(function(data) {
  return data;
     });
    }
    res.end();
});

router.delete('/chest', function(req, res) {
  
});
//this is where endpoints for updating client information will soon go
//and other really cool shit

module.exports = router;